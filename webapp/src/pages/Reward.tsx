import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from 'wagmi'
import { checkRewardStatus, rewardSignIn } from '../client/mutations/rewards';
import { toast } from 'react-toastify';
import Logo from '../assets/logo-vertical.png';
import { Reward } from '../types/rewards';

const OPERATORS_NAME: any = {
  $eq: 'equals to',
  $ne: 'not equals to',
  $lt: 'less than',
  $gt: 'greater than',
  $in: 'in',
  $nin: 'not in',
};

export interface RewardProps {
  
}

export const RewardPage: FC<RewardProps> = () => {
  const [statusError, setStatusError] = useState<string>();
  const [couponCode, setCouponCode] = useState<string>();
  const [qrcodeBase64, setQrcodeBase64] = useState<string>();
  const [reward, setReward] = useState<Reward>();
  const params = useParams();
  const [sessionId, setSessionId] = useState<string>();
  const signinMutation = useMutation({
    mutationKey: ['rewardSignIn'],
    mutationFn: () => rewardSignIn({ rewardId: params.rewardId as string }),
  });
  const checkRewardStatusMutation = useMutation({
    mutationKey: ['checkRewardStatus'],
    mutationFn: checkRewardStatus,
  })
  useEffect(() => {
    signinMutation.mutateAsync().then(res => {
      setQrcodeBase64(res.qrcodeBase64);
      setSessionId(res.sessionId);
      setReward(res.reward);
    })
    .catch(() => {
      toast.error('Could not retrieve reward QR Code');
    })
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionId && !couponCode && !statusError) {
        checkRewardStatusMutation.mutateAsync({ sessionId })
          .then(res => {
            if (res.error) {
              toast.error(res.error);
              setStatusError(res.error);
              clearInterval(interval);
              return;
            }
            setCouponCode(res.couponCode);
          })
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          .catch(() => {});
      }
    }, 3000);
  }, [sessionId]);
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center">
          <img src={Logo} className="h-48 mb-24" />
        </div>
        <div>
          <h1 className="font-bold text-2xl">
            {reward?.name}
          </h1>
          <div className="mt-8">
            Eligibility Condition:
            <div className="mt-2 mb-8">
              <strong>{reward?.conditionField} </strong>{OPERATORS_NAME[reward?.conditionOperator || '']} <strong>{reward?.conditionValue || ''}</strong>
            </div>
          </div>
          {couponCode ? (
            <div>
              {couponCode}
            </div>
          ): (
            <img src={qrcodeBase64} />
          )}
        </div>
      </div>
    </div>
  )
}
