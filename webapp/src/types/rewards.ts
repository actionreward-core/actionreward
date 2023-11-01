export interface Reward {
  id: string;
  name: string;
  type: 'GIFT_CARD' | 'CUSTOM_HTTP';
  conditionField: string;
  conditionOperator: string;
  conditionValue: string;
}