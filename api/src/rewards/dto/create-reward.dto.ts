export class CreateRewardDto {
  projectId: string;
  schemaId: string;
  name: string;
  conditionField: string;
  conditionOperator: string;
  conditionValue: string;
  coupons: string[];
}
