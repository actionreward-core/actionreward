export class SendActionDto {
  userId: string;
  actionKey: string;
  properties: { [key: string]: any };
}
