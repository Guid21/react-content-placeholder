import React from 'react';

type GetChildrenWithVisibilityHiddenOptions = Readonly<{
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}>;

const getChildrenWithVisibilityHidden = ({
  children,
}: GetChildrenWithVisibilityHiddenOptions): React.ReactNode[] => {
  const loop = (
    child: any
  ): React.DetailedReactHTMLElement<any, HTMLElement> => {
    return React.Children.map(child, (child) => {
      switch (typeof child?.type) {
        case 'string':
          return React.cloneElement(child, {
            ...child?.props,
            style: {
              ...child?.props?.style,
              visibility: 'hidden',
            },
          });
        case 'symbol':
          return loop(child.props.children);
        case 'function':
          // I don't support class components yet
          if (child?.type?.prototype?.constructor) {
            return 
          }

          return loop((child?.type as any)(child.props));
        default:
          return child;
      }
    })
  };

  
  if (children?.props?.children) {
    return React.Children.map(children.props.children, (child) => {
      return loop(child);
    });
  }
  
  return []
};

type CreatePlaceholderOptions = Readonly<{
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  style?: Record<string, string>;
}>;

const createPlaceholder = ({ children, style }: CreatePlaceholderOptions) => {
  return React.cloneElement(
    children,
    {
      ...children.props,
      style: {
        ...children.props.style,
        userSelect: 'none',
        backgroundImage: `url('https://i.postimg.cc/VLC3WF9t/3pk-Fb-IT7-rn.gif')`,
        backgroundRepeat: 'repeat',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: 'transparent',
        ...style,
      },
    },
    ...getChildrenWithVisibilityHidden({ children })
  );
};

type MakeContentOptions = Readonly<{ children?: React.ReactNode }>;

const makeContentPlaceholder = ({
  children,
}: MakeContentOptions): React.ReactNode => {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      switch (typeof child?.type) {
        case 'string':
          return createPlaceholder({ children: child });
        case 'symbol':
          return makeContentPlaceholder({ children: child.props.children });
        case 'function':
          // I don't support class components yet
          if (child?.type?.prototype?.constructor) {
            return 
          }

          return makeContentPlaceholder({ children: (child?.type as any)(child.props) });
        default:
          return child;
      }
    }

    return child;
  });
};

type SkeletonProps = Readonly<{
  loading?: boolean;
  children?: React.ReactNode;
}>;

export const Skeleton = React.memo(({ children, loading }: SkeletonProps) => {
  if (!loading) {
    return <>{children}</>;
  }

  return <>{makeContentPlaceholder({ children })}</>;
});
