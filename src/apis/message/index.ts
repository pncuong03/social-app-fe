import httpRequest1 from "src/utilities/services/httpRequest copy";

export function getListMessage(accessToken: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest1.get(`/chat`, auth).then((data: any) => {
    return data.data;
  });
}

export function getMessageDetail(accessToken: string, chatId: string) {
  const auth = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return httpRequest1.get(`/chat/messages?chatId=${chatId}`, auth).then((data: any) => {
    return data.data;
  });
}
