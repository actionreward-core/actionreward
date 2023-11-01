import { auth, resolver } from '@iden3/js-iden3-auth';
import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CacheService } from 'src/cache/cache.service';
import * as QRCode from 'qrcode';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class ConnectService {
  constructor(
    private cacheService: CacheService,
    private projectService: ProjectsService,
  ) {}

  async getConnectAuthRequest(projectId: string, userId: string) {
    const sessionId = randomUUID();
    const request = auth.createAuthorizationRequest(
      'test flow',
      process.env.VERIFY_FROM_DID,
      `${process.env.BASE_URL}/api/connect/callback?sessionId=${sessionId}`,
    );

    this.cacheService.put(
      `connect:auth:session:${sessionId}`,
      JSON.stringify({
        projectId,
        userId,
        request,
      }),
    );

    const qrcodeBase64 = await QRCode.toDataURL(JSON.stringify(request));

    return {
      request,
      sessionId,
      qrcodeBase64,
    };
  }

  async completeConnect(sessionId: string, token: string) {
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
      `connect:auth:session:${sessionId}`,
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

    const did = authResponse.from;

    await this.projectService.identify(session.projectId, {
      userId: session.userId,
      did,
    });
  }
}
