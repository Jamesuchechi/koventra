import React from 'react';

interface StickyStackContainerProps {
    children: React.ReactNode;
    navHeight?: number; // Height of navbar in pixels (default: 90)  
}

/**
 * StickyStackContainer wraps sections to create a "sticky stack" or "deck scrolling" effect.
 * Each child section will stick to the top and layer on top of previous sections as you scroll.
 */
export default function StickyStackContainer({
    children,
    navHeight = 90,
}: StickyStackContainerProps) {
    return (
        <div
            className="sticky-stack-container"
            style={
                {
                    '--nav-height': `${navHeight}px`,
                } as React.CSSProperties
            }
        >
            {React.Children.map(children, (child, index) => (
                <div
                    className="sticky-stack-section"
                    style={{
                        zIndex: 10 + index,
                    }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
}
