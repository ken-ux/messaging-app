export interface Message {
  sender: string;
  recipient: string;
  message_body: string;
  creation_date: Date;
}

export interface Profile {
  description: string;
  color: string;
}