import {PipelineDefinitions, SBuildHistory} from "../views/testStatus/types";

import {
    pipelineChartData_13082,
    pipelineChartData_13083,
    pipelineChartData_15087,
    pipelineChartData_22987,
    pipelineChartData_29556
} from "./pipelineChart.data";

export const fetchPipelineBuildInfo = async (pipelineId: number | string): Promise<SBuildHistory> => {
    // const response: AxiosResponse<SBuildHistory> = await commonHttpClient.get(`fakeURL/status/pipelineId/${pipelineId}`);
    // return response.data;
    const randomDelay = Math.random() * 1000 + 500;
    return new Promise((resolve) => {
            setTimeout(() => {
                switch (pipelineId) {
                    case '15087':
                        resolve(pipelineChartData_15087);
                        return;
                    case '22987':
                        resolve(pipelineChartData_22987);
                        return;
                    case '13082':
                        resolve(pipelineChartData_13082);
                        return;
                    case '13083':
                        resolve(pipelineChartData_13083);
                        return;
                    case '29556':
                        resolve(pipelineChartData_29556);
                        return;
                    default:
                        resolve({
                            "count": 0,
                            "name": "no-build-name",
                            "project": "no-project",
                            "runType": "TESTS",
                            "history": []
                        });
                        return;
                }
            }, randomDelay);
        }
    );
};

export const fetchPipelineDefinitions = async (): Promise<PipelineDefinitions> => {
    // const response: AxiosResponse<PipelineDefinitions> = await commonHttpClient.get('fakeURL/status/definitions');
    // return response.data;
    return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                        "15087": "service-a-project",
                        "22987": "service-a-project",
                        "13082": "service-b-project",
                        "13083": "service-b-project",
                        "29556": "service-c-project",
                    }
                );
            }, 500);
        }
    );
};

