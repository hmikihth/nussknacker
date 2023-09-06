/* eslint-disable i18next/no-literal-string */
import React, { PropsWithChildren, useState, useEffect } from "react";
import Scrollbars from "react-scrollbars-custom";
import styled from "@emotion/styled";
import { Side, PanelSide } from "./SidePanel";

const SCROLLBAR_WIDTH = 40; //some value bigger than real scrollbar width
const CLEAN_STYLE = null;
const SCROLL_THUMB_SIZE = 8;

const trackStyleProps = (side: Side) => ({
    background: CLEAN_STYLE,
    borderRadius: SCROLL_THUMB_SIZE,
    backgroundColor: "transparent",
    width: SCROLL_THUMB_SIZE - 1,
    top: CLEAN_STYLE,
    bottom: CLEAN_STYLE,
    height: CLEAN_STYLE,
    right: side === PanelSide.Left ? 0 : null,
    left: side === PanelSide.Right ? 0 : null,
});

const thumbYStyleProps = {
    borderRadius: SCROLL_THUMB_SIZE,
    cursor: "all-scroll",
    backgroundColor: "rgba(0,0,0, 0.45)",
};

const scrollerStyleProps = { padding: CLEAN_STYLE, display: "flex" };

const ScrollbarsWrapper = styled.div(({ isScrollPossible }: { isScrollPossible: boolean }) => ({
    minHeight: "100%",
    display: "flex",
    transition: "all .25s",
    overflow: "hidden",
    background: isScrollPossible && "#646464",
    pointerEvents: isScrollPossible ? "auto" : "inherit",
}));

interface ScrollbarsExtended {
    onScrollToggle?: (isEnabled: boolean) => void;
    side: Side;
}

export function ScrollbarsExtended({ children, onScrollToggle, side }: PropsWithChildren<ScrollbarsExtended>) {
    const [isScrollPossible, setScrollPossible] = useState<boolean>();

    useEffect(() => {
        onScrollToggle?.(isScrollPossible);
    }, [isScrollPossible]);

    return (
        <Scrollbars
            noScrollX
            style={{
                pointerEvents: isScrollPossible ? "auto" : "inherit",
            }}
            disableTracksWidthCompensation
            trackYProps={{ style: trackStyleProps(side) }}
            thumbYProps={{ style: thumbYStyleProps }}
            contentProps={{ style: scrollerStyleProps }}
            scrollbarWidth={SCROLLBAR_WIDTH}
            scrollerProps={{ style: { marginRight: -SCROLLBAR_WIDTH } }}
            onUpdate={({ scrollYPossible }) => setScrollPossible(scrollYPossible)}
        >
            <ScrollbarsWrapper isScrollPossible={isScrollPossible}>{children}</ScrollbarsWrapper>
        </Scrollbars>
    );
}
