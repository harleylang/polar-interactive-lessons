import React, { useState } from 'react';

import { MDXProvider } from '@mdx-js/react';

import styled from 'styled-components';

import useWindowDimensions from 'functions/useWindowDimensions';

import 'hello-polar';

import * as lessondat from 'lessons';

interface Props {
    // define the types for your props here
};

/**
 * Home -- page
 * @return {JSX} React component
 */
const Home = ({
    // put your props here
}: Props) => {

    const [ lesson, setLesson ] = useState<any>(undefined);

    const [ context, setContext ] = useState('');

	const { dimensions } = useWindowDimensions();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        
        let lessonIndex = parseInt(event.currentTarget.value);

        let Component = (lessondat as any)[`Lesson${lessonIndex}`].default
        
        setLesson(<Component />);

        let meta = (lessondat as any)[`Lesson${lessonIndex}`].meta;

        setContext(JSON.stringify({ tests: [...meta.tests] }));

    };

    return (
        <Container $width={dimensions.width} $height={dimensions.height}>

            <Narrow>
                <h1 style={{ textAlign: 'center' }}>Polar Koalafications</h1>
                <select onChange={handleChange} defaultValue='0'>
                    <option disabled value='0'>Choose a lesson</option>
                    {Object.keys(lessondat).map((l: any, i: number) => {
                        return <option key={`option-${i}`} value={i + 1}>{l}</option>
                    })}
                </select>
                {typeof lesson !== 'undefined' ?
                    <MDXProvider components={{}}>
                        {lesson}
                    </MDXProvider> 
                :
                    <>
                        <h2>Welcome!</h2>
                        <p>Get started learning Polar. Choose a lesson above to begin.</p>
                    </>
                }
                {context.length > 0 && (
                    <hello-polar key={context} context={context} />
                )}
            </Narrow>
        
        </Container>
    );

};

const Narrow = styled.article`
    width: 75%;
`;

const Container = styled.main<{ $width: number, $height: number }>`
    width: ${({$width}) => $width}px;
    height: ${({$height}) => $height}px;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    overflow-y: auto;
`;

export default Home;
