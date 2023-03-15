export type ClipboardState = {
  clipboards: Clipboard[];
  status: '' | 'pending' | 'fulfilled' | 'rejected';
  response: any;
};

export type Clipboard = {
  type: 'image' | 'text';
  value: string;
};
