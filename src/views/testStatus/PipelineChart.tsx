import '../../styles/pipelineChart.css';

import React, {useEffect, useState} from 'react';

import {
    blueCircle,
    circleFailure,
    circleSuccess,
    grayCircle,
    greenCircle,
    redCircle,
    yellowCircle,
} from '../../assets/icons';
import {SBuild, SBuildHistory} from "./types";
import {fetchPipelineBuildInfo} from "../../httpClient/testStatusAPI";
import {OverlayTrigger, Spinner, Tooltip} from "react-bootstrap";

const PASSED_STATUS = 'PASSED';

export const PipelineChart: React.FC<{ pipelineId: number | string }> = (props: { pipelineId: number | string }) => {
    const {pipelineId} = props;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [chartData, setChartData] = useState<Array<SBuild | undefined>>([]);
    const [chartTitle, setChartTitle] = useState<string>('');
    const [maxDuration, setMaxDuration] = useState<number>(100);
    const [isLastBuildSuccess, setIsLastBuildSuccess] = useState<boolean>(false);
    const [runType, setRunType] = useState<string>('');

    const convertDurationToSeconds = (duration: string): number => {
        const [minutes, seconds] = duration.split(':');
        return (+minutes * 60 + +seconds);
    };

    const provideNormalisedDurationInSeconds = (duration: string | undefined): number => {
        if (!duration) return 0;
        if (duration.includes(':')) {
            return convertDurationToSeconds(duration);
        }
        return Math.round(+duration / 1000);
    };

    const formatDurationToMinutesAndSeconds = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    useEffect(() => {
        fetchPipelineBuildInfo(pipelineId).then((externalData: SBuildHistory) => {
            const buildDurations: number[] = externalData.history.map((build: SBuild | undefined) => (build ? provideNormalisedDurationInSeconds(build.duration) : 0));
            setMaxDuration(Math.max(...buildDurations));

            if (externalData.history.length < 20) {
                const dataLength = 20 - externalData.count;
                for (let i = 0; i < dataLength; i += 1) {
                    externalData.history.push(undefined);
                }
            }
            const reversedExternalData = externalData.history.reverse();
            setRunType(externalData.runType);
            setChartTitle(externalData.name);
            setChartData(reversedExternalData);
            setIsLoading(false);
        });
    }, []);

    useEffect(() => {
        const lastBuild: SBuild | undefined = chartData[chartData.length - 1];
        if (lastBuild) setIsLastBuildSuccess(lastBuild.result.toUpperCase() === PASSED_STATUS);
    }, [chartData]);

    return (
        <div>{isLoading ? <Spinner/>
            : (
                <div className='chart-container'>
                    <div className="title-container">
                        {chartTitle.length < 30 ? chartTitle : (
                            <div>{chartTitle.substring(0, 28)}...&nbsp;
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>{chartTitle}</Tooltip>}
                                ><span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round"><circle
                                    cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8"
                                                                                                         x2="12.01"
                                                                                                         y2="8"/></svg></span>
                                </OverlayTrigger>
                            </div>
                        )}
                    </div>
                    <div className="bar-container">
                        <div key={3} style={{marginLeft: '2px', display: 'flex'}}>
                            {chartData.map((item: SBuild | undefined, index: number) => {
                                if (item) {
                                    const currentBuildDuration: number = provideNormalisedDurationInSeconds(item.duration);
                                    const barHeight: number = (currentBuildDuration / maxDuration) * 100;
                                    return (
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip
                                                key={index}
                                                placement="top"
                                            >
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        <td><b>Name:</b></td>
                                                        <td><b>{item.name}</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Started:</td>
                                                        <td>{new Date(item.date).toLocaleString()}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Duration:</td>
                                                        <td>{formatDurationToMinutesAndSeconds(provideNormalisedDurationInSeconds(item.duration))}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>

                                                <table><b>Test outcome:</b>
                                                    <tbody>
                                                    <tr>
                                                        <td>&nbsp;{greenCircle}&nbsp;Passed:</td>
                                                        <td><b>{item.testRunOutcome?.passed}</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td>&nbsp;{redCircle}&nbsp;Failed:</td>
                                                        <td><b>{item.testRunOutcome?.failed}</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td>&nbsp;{grayCircle}&nbsp;Skipped:</td>
                                                        <td><b>{item.testRunOutcome?.skipped}</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td>&nbsp;{yellowCircle}&nbsp;Flaky:</td>
                                                        <td><b>{item.testRunOutcome?.flaky}</b></td>
                                                    </tr>
                                                    <tr>
                                                        <td>&nbsp;{blueCircle}&nbsp;Total:</td>
                                                        <td><b>{item.testRunOutcome?.total}</b></td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </Tooltip>}
                                        >
                                            <div
                                                key={index}
                                                className="bar-back-bar"
                                                onClick={() => window.open(item!.url!, '_blank')}
                                            >
                                                <div
                                                    className={item.result.toUpperCase() === PASSED_STATUS ? 'chart-bar success-bar' : 'chart-bar failure-bar'}
                                                    style={{
                                                        height: `${barHeight}px`,
                                                        marginTop: `${100 - barHeight}px`
                                                    }}
                                                />
                                            </div>
                                        </OverlayTrigger>


                                    );
                                }
                                return (
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip
                                            key={index}
                                            placement="top"
                                        >
                                            <span>Build placeholder.</span><br/>
                                        </Tooltip>}
                                    >
                                        <div key={index} className="bar-back-bar">
                                            <div
                                                className="chart-bar empty-bar"
                                            />
                                        </div>
                                    </OverlayTrigger>
                                );
                            })}
                        </div>
                    </div>
                    <div className="footer-container">
                        {isLastBuildSuccess ? circleSuccess : circleFailure}
                        <span className="footer-status-text">{isLastBuildSuccess ? 'Success' : 'Failure'}</span>
                    </div>
                </div>
            )}
        </div>
    );
};
