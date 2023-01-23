import { Dashboard, PaginationType } from "app";
import { httpClient } from "app/http";
import { AxiosResponse } from "axios";

const appUrl = "/dashboard";

export const useDashboardService = () => {
  const loadDashboard = async () => {
    const url = `${process.env.BASEURL + appUrl}`;

    const response: AxiosResponse = await httpClient.get(url);

    return response.data;
  };

  return {
    loadDashboard,
  };
};
