import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from 'wagmi'
import { rewardSignIn } from '../client/mutations/rewards';
import { toast } from 'react-toastify';

export interface RewardProps {
  
}

export const RewardPage: FC<RewardProps> = (props) => {
  const [qrcodeBase64, setQrcodeBase64] = useState<string>();
  const params = useParams();
  const signinMutation = useMutation({
    mutationKey: ['rewardSignIn'],
    mutationFn: () => rewardSignIn({ rewardId: params.rewardId as string }),
  })
  useEffect(() => {
    signinMutation.mutateAsync().then(res => {
      setQrcodeBase64(res.qrcodeBase64);
    })
    .catch(() => {
      toast.error('Could not retrieve reward QR Code');
    })
  }, [])
  return (
    <div>
      <img src={qrcodeBase64} />
    </div>
  )
}
