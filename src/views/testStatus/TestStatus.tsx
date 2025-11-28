// import {Card, PageTitle, PageWrapper, Spinner} from '@spark/components';
import React, {useEffect, useState} from 'react';
import {PipelineDefinitions} from "./types";
import {fetchPipelineDefinitions} from "../../httpClient/testStatusAPI";
import {Card, Container, Spinner} from "react-bootstrap";
import {PipelineChartContainer} from "./PipelineChartContainer";
import {PageTitle, PageTitleDescription} from "../../components/common/Common.styled";

export const TestStatus: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [definitions, setDefinitions] = useState<PipelineDefinitions>({1: 'mock'});
    const [projectSet, setProjectSet] = useState<string[]>([]);
    const refreshTime = 300 * 1000;

    const fetchConfig = async (): Promise<void> => {
        fetchPipelineDefinitions().then((pipelineDefinitions: PipelineDefinitions) => {
            setDefinitions(pipelineDefinitions);
            const projects: string[] = Object.keys(pipelineDefinitions).map((item: string) => pipelineDefinitions[item]);
            setProjectSet(Array.from(new Set(projects)).sort());
            setIsLoading(false);
        });
    };

    useEffect(() => {
        fetchConfig();
        const updateInterval = setInterval(fetchConfig, refreshTime);
        return () => clearInterval(updateInterval); // Clear interval on component unmount to avoid memory leak
    }, []);

    return (
        <Container fluid>
            <PageTitle>Test Status</PageTitle>
            <PageTitleDescription>Dashboard for E2E/API test runs.</PageTitleDescription>

            <Card border={'light'} style={{padding: '20px', marginBottom: '20px'}}>
                {isLoading ? <Spinner/>
                    : projectSet.map((project: string, index) => {
                        const pipelineIds: string[] = Object.keys(definitions).filter((item: string): boolean => definitions[item] === project);
                        return <PipelineChartContainer key={index} project={project} pipelineIds={pipelineIds}/>;
                    })}
            </Card>
        </Container>
    );
};
