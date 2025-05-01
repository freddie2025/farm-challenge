import api from "./api";

export abstract class BaseService {
  protected static getData = async <T extends object>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<Array<T>> => (await api.get<Array<T>>(endpoint, { params })).data;
}
