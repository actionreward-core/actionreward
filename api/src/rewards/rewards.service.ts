import { BadRequestException, Injectable } from '@nestjs/common';
import { auth, resolver } from '@iden3/js-iden3-auth';
import { PrismaService } from 'src/prisma.service';
import { CacheService } from 'src/cache/cache.service';
import { randomUUID } from 'crypto';
import * as QRCode from 'qrcode';
import { ProjectActionSchema, ProjectReward } from '@prisma/client';
import { SchemaData } from 'src/schemas/schemas.types';
import { PaginatorOptions, paginator } from 'src/common/helpers/paginator';
import { CreateRewardDto } from './dto/create-reward.dto';

@Injectable()
export class RewardsService {
  constructor(
    private prismaService: PrismaService,
    private cacheService: CacheService,
  ) {}

  findAll({ projectId }: { projectId: string }, opts: PaginatorOptions) {
    return paginator({
      model: this.prismaService.projectReward,
      args: {
        where: {
          projectId,
        },
      },
      opts,
    });
  }

  private static getConditionTypedValue(
    reward: ProjectReward & { schema: ProjectActionSchema },
  ) {
    const value = reward.conditionValue;
    const schemaData = reward.schema.data as unknown as SchemaData;
    const fieldType = schemaData.fields.find(
      (field) => field.name === reward.conditionField,
    ).type;

    if (fieldType === 'string') {
      return value;
    }

    if (fieldType === 'integer' || fieldType === 'number') {
      return Number(value);
    }

    if (fieldType === 'boolean') {
      return value === 'true';
    }

    return value;
  }

  async getRewardAuthRequest(rewardId: string) {
    const reward = await this.prismaService.projectReward.findUnique({
      where: {
        id: rewardId,
      },
      include: {
        schema: true,
      },
    });
    const sessionId = randomUUID();

    const request = auth.createAuthorizationRequest(
      'test flow',
      process.env.VERIFY_FROM_DID,
      `${process.env.BASE_URL}/api/rewards/callback?sessionId=${sessionId}`,
    );

    const { schema } = reward;

    const proofRequest = {
      id: 1,
      circuitId: 'credentialAtomicQuerySigV2',
      query: {
        allowedIssuers: ['*'],
        type: schema.schemaTypeName,
        context: `${schema.schemaUrl}ld`,
        credentialSubject: {
          [reward.conditionField]: {
            [reward.conditionOperator]:
              RewardsService.getConditionTypedValue(reward),
          },
        },
      },
    };

    this.cacheService.put(
      `reward:auth:session:${sessionId}`,
      JSON.stringify({
        rewardId: reward.id,
        request,
      }),
    );

    const scope = request.body.scope ?? [];
    request.body.scope = [...scope, proofRequest];

    const qrcodeBase64 = await QRCode.toDataURL(JSON.stringify(request));

    return {
      reward,
      request,
      sessionId,
      qrcodeBase64,
    };
  }

  async completeRewardClaim(sessionId: string, token: string) {
    const ethURL = process.env.ETHEREUM_URL;
    const contractAddress = process.env.VERIFY_CONTRACT_ADDRESS;
    const keyDIR = './circuits/keys';

    const ethStateResolver = new resolver.EthStateResolver(
      ethURL,
      contractAddress,
    );

    const resolvers = {
      ['polygon:mumbai']: ethStateResolver,
    };

    const sessionJson = this.cacheService.get(
      `reward:auth:session:${sessionId}`,
    );
    if (!sessionJson) {
      throw new BadRequestException('Session not found');
    }
    const session = JSON.parse(sessionJson);

    const verifier = await auth.Verifier.newVerifier({
      stateResolver: resolvers,
      circuitsDir: keyDIR,
      ipfsGatewayURL: process.env.IPFS_GATEWAY_URL,
    });

    const opts = {
      AcceptedStateTransitionDelay: 5 * 60 * 1000, // 5 minute
    };

    const authResponse = await verifier.fullVerify(
      token,
      session.request,
      opts as any,
    );

    const userId = authResponse.from;

    const coupon = await this.prismaService.projectRewardCoupon.findFirst({
      where: {
        claimedAt: null,
        projectRewardId: session.rewardId,
      },
    });

    const statusCacheKey = `reward:auth:session:${sessionId}:status`;

    if (!coupon) {
      await this.cacheService.put(
        statusCacheKey,
        JSON.stringify({
          error: 'No code available',
        }),
      );
      return authResponse;
    }

    await this.cacheService.put(
      statusCacheKey,
      JSON.stringify({
        couponCode: coupon.code,
      }),
    );

    await this.prismaService.projectRewardCoupon.update({
      where: {
        id: coupon.id,
      },
      data: {
        claimedAt: new Date(),
      },
    });

    return authResponse;
  }

  async create(createSchemaDto: CreateRewardDto) {
    const {
      projectId,
      schemaId,
      name,
      conditionField,
      conditionOperator,
      conditionValue,
      coupons,
    } = createSchemaDto;

    const reward = await this.prismaService.projectReward.create({
      data: {
        projectId,
        projectActionSchemaId: schemaId,
        name,
        conditionField,
        conditionOperator,
        conditionValue,
        type: 'GIFT_CARD', // Currently, for the hackathon scope we have only the gift card option
        coupons: {
          createMany: {
            data: coupons.map((code) => ({
              code,
            })),
          },
        },
      },
    });

    return reward;
  }

  async getClaimStatus(sessionId: string) {
    const statusJson = await this.cacheService.get(
      `reward:auth:session:${sessionId}:status`,
    );
    if (!statusJson) {
      throw new BadRequestException('Session not available');
    }
    return JSON.parse(statusJson);
  }
}
