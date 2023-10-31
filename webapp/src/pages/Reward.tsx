import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from 'wagmi'
import { checkRewardStatus, rewardSignIn } from '../client/mutations/rewards';
import { toast } from 'react-toastify';

export interface RewardProps {
  
}

export const RewardPage: FC<RewardProps> = () => {
  const [statusError, setStatusError] = useState<string>();
  const [couponCode, setCouponCode] = useState<string>();
  const [qrcodeBase64, setQrcodeBase64] = useState<string>();
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
    <div>
      {couponCode ? (
        <div>
          {couponCode}
        </div>
      ): (
        <img src={qrcodeBase64} />
      )}
    </div>
  )
}
