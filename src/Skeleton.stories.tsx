import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Skeleton } from './Skeleton';

export default {
  title: 'Skeleton',
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <div style={{ display: 'flex' }}>
    <div style={{ width: '50%', padding: '5px' }}>
      <Skeleton {...args} loading />
    </div>
    <div style={{ width: '50%', padding: '5px' }}>{args.children}</div>
  </div>
);

const ExampleComponentWithStyle = (props: React.ComponentProps<'div'>) => {
  return (
    <>
      <div {...props} style={{color: 'black'}}>example component with style </div>
    </>
  );
};

const ExampleComponentWithoutStyle = () => {
  return (
    <>
      <div style={{color: 'black'}}>example component without style</div>
      <>
        <ExampleComponentWithStyle />
      </>
    </>
  );
};

const demoElements = [
  <div
    style={{
      height: '50px',
      width: '50px',
      backgroundColor: 'black',
      borderRadius: '100%',
      marginBottom: '5px',
    }}
    key={1}
  />,
  <span style={{ marginRight: '10px' }} key={2}>
    Name
  </span>,
  <span style={{ marginRight: '10px' }} key={3}>
    Middle name
  </span>,
  <p key={4}>
    <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos adipisci
      accusantium, hic aperiam vel aspernatur tempore explicabo veniam totam
      cupiditate beatae earum cumque? Nam sequi quasi officiis qui corrupti!
      Reprehenderit!
    </span>
  </p>,
];

export const Example = Template.bind({});
Example.args = {
  children: demoElements,
};

export const ExampleWithNestedComponents = Template.bind({});
ExampleWithNestedComponents.args = {
  children: [
    ...demoElements,
    <ExampleComponentWithStyle key={5} />,
    <ExampleComponentWithoutStyle key={6} />,
    <div key={7}>
      <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos adipisci
        accusantium, hic aperiam vel aspernatur tempore explicabo veniam totam
        cupiditate beatae earum cumque? Nam sequi quasi officiis qui corrupti!
        Reprehenderit!
      </span>
    <ExampleComponentWithoutStyle  />
    </div>,
  ],
};
