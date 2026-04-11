module.exports = [
"[project]/components/ArgumentPanel/ArgumentPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArgumentPanel",
    ()=>ArgumentPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function ArgumentPanel({ speaker, label, updates }) {
    const speakerColor = speaker === "speaker_a" ? "var(--color-speaker-a)" : "var(--color-speaker-b)";
    const { argumentText, counterText, isArgumentFinal, isCounterFinal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>_accumulateUpdates(updates), [
        updates
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            ...styles.headerLabel,
                            color: speakerColor
                        },
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: styles.headerSub,
                        children: "Argument Analysis"
                    }, void 0, false, {
                        fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.body,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Argument",
                        text: argumentText,
                        isFinal: isArgumentFinal,
                        accentColor: speakerColor,
                        emptyLabel: "Waiting for argument…"
                    }, void 0, false, {
                        fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.divider
                    }, void 0, false, {
                        fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Counterargument",
                        text: counterText,
                        isFinal: isCounterFinal,
                        accentColor: "var(--color-text-muted)",
                        emptyLabel: "Waiting for counterargument…"
                    }, void 0, false, {
                        fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
function Section({ title, text, isFinal, accentColor, emptyLabel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.section,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    ...styles.sectionTitle,
                    color: accentColor
                },
                children: title
            }, void 0, false, {
                fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            text ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: styles.sectionText,
                children: [
                    text,
                    !isFinal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: styles.cursor,
                        children: "▋"
                    }, void 0, false, {
                        fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
                        lineNumber: 70,
                        columnNumber: 24
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
                lineNumber: 68,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: styles.emptyText,
                children: emptyLabel
            }, void 0, false, {
                fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
        lineNumber: 65,
        columnNumber: 5
    }, this);
}
/**
 * Groups updates by (turnId, role).
 * When a new turnId appears for a role, that role's text is reset.
 * Concatenates deltas in arrival order for the current turnId.
 * Sets isFinal = true when an update with isFinal === true is received.
 */ function _accumulateUpdates(updates) {
    let argumentText = "";
    let counterText = "";
    let isArgumentFinal = true;
    let isCounterFinal = true;
    let argumentTurnId = "";
    let counterTurnId = "";
    for (const u of updates){
        if (u.role === "argument") {
            if (u.turnId !== argumentTurnId) {
                // New turn — reset.
                argumentText = "";
                isArgumentFinal = false;
                argumentTurnId = u.turnId;
            }
            argumentText += u.delta;
            if (u.isFinal) isArgumentFinal = true;
        } else {
            if (u.turnId !== counterTurnId) {
                counterText = "";
                isCounterFinal = false;
                counterTurnId = u.turnId;
            }
            counterText += u.delta;
            if (u.isFinal) isCounterFinal = true;
        }
    }
    return {
        argumentText,
        counterText,
        isArgumentFinal,
        isCounterFinal
    };
}
// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--color-surface)",
        borderRadius: "12px",
        border: "1px solid var(--color-border)",
        overflow: "hidden"
    },
    header: {
        display: "flex",
        alignItems: "baseline",
        gap: "0.5rem",
        padding: "0.875rem 1.25rem",
        borderBottom: "1px solid var(--color-border)",
        flexShrink: 0
    },
    headerLabel: {
        fontSize: "0.875rem",
        fontWeight: 700
    },
    headerSub: {
        fontSize: "0.7rem",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--color-text-muted)"
    },
    body: {
        flex: 1,
        overflowY: "auto",
        padding: "1rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: 0
    },
    section: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        paddingBlock: "0.75rem"
    },
    sectionTitle: {
        fontSize: "0.7rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.1em"
    },
    sectionText: {
        fontSize: "0.9rem",
        lineHeight: 1.7,
        color: "var(--color-text-primary)"
    },
    emptyText: {
        fontSize: "0.875rem",
        color: "var(--color-text-muted)",
        fontStyle: "italic"
    },
    cursor: {
        display: "inline-block",
        marginLeft: "1px",
        animation: "blink 1s step-end infinite",
        color: "var(--color-text-muted)",
        fontSize: "0.85em",
        verticalAlign: "text-bottom"
    },
    divider: {
        height: "1px",
        background: "var(--color-border)",
        flexShrink: 0
    }
};
}),
"[project]/components/TranscriptPanel/TranscriptPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TranscriptPanel",
    ()=>TranscriptPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function TranscriptPanel({ entries }) {
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Auto-scroll to bottom whenever entries change.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [
        entries
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: styles.heading,
                children: "Live Transcript"
            }, void 0, false, {
                fileName: "[project]/components/TranscriptPanel/TranscriptPanel.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.scroll,
                children: [
                    entries.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: styles.empty,
                        children: "Transcript will appear here once the session starts…"
                    }, void 0, false, {
                        fileName: "[project]/components/TranscriptPanel/TranscriptPanel.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this),
                    entries.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TurnBlock, {
                            entry: entry
                        }, entry.turnId, false, {
                            fileName: "[project]/components/TranscriptPanel/TranscriptPanel.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: bottomRef
                    }, void 0, false, {
                        fileName: "[project]/components/TranscriptPanel/TranscriptPanel.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TranscriptPanel/TranscriptPanel.tsx",
                lineNumber: 21,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/TranscriptPanel/TranscriptPanel.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
function TurnBlock({ entry }) {
    const speakerColor = entry.speaker === "speaker_a" ? "var(--color-speaker-a)" : entry.speaker === "speaker_b" ? "var(--color-speaker-b)" : "var(--color-text-muted)";
    const label = entry.speaker === "speaker_a" ? "Speaker A" : entry.speaker === "speaker_b" ? "Speaker B" : "…";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...styles.turn,
            borderLeftColor: speakerColor
        },
        children: [
            entry.speaker !== "unknown" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    ...styles.speakerLabel,
                    color: speakerColor
                },
                children: label
            }, void 0, false, {
                fileName: "[project]/components/TranscriptPanel/TranscriptPanel.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: styles.turnText,
                children: [
                    entry.text,
                    entry.isPartial && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: styles.cursor,
                        children: "▋"
                    }, void 0, false, {
                        fileName: "[project]/components/TranscriptPanel/TranscriptPanel.tsx",
                        lineNumber: 66,
                        columnNumber: 29
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TranscriptPanel/TranscriptPanel.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/TranscriptPanel/TranscriptPanel.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--color-surface)",
        borderRadius: "12px",
        border: "1px solid var(--color-border)",
        overflow: "hidden"
    },
    heading: {
        padding: "0.875rem 1.25rem",
        fontSize: "0.75rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "var(--color-text-muted)",
        borderBottom: "1px solid var(--color-border)",
        flexShrink: 0
    },
    scroll: {
        flex: 1,
        overflowY: "auto",
        padding: "1rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.625rem"
    },
    empty: {
        color: "var(--color-text-muted)",
        fontSize: "0.875rem",
        fontStyle: "italic"
    },
    turn: {
        borderLeft: "3px solid transparent",
        paddingLeft: "0.75rem"
    },
    speakerLabel: {
        display: "block",
        fontSize: "0.7rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginBottom: "0.2rem"
    },
    turnText: {
        fontSize: "0.9375rem",
        lineHeight: 1.6,
        color: "var(--color-text-primary)"
    },
    cursor: {
        display: "inline-block",
        marginLeft: "2px",
        animation: "blink 1s step-end infinite",
        color: "var(--color-text-muted)",
        fontSize: "0.875em",
        verticalAlign: "text-bottom"
    }
};
}),
"[project]/lib/socket.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ConversationSocket — manages the WebSocket connection to the server and
 * captures microphone audio as raw PCM for forwarding.
 *
 * Audio pipeline:
 *   getUserMedia (mono, 16 kHz)
 *   → AudioContext (sampleRate: 16 000)
 *   → ScriptProcessorNode (bufferSize: 4 096 = ~256 ms)
 *   → Float32 → Int16 PCM conversion
 *   → binary WebSocket frame → server → ElevenLabs Scribe
 *
 * Server → browser message types:
 *   transcript        — live partial or committed text per speaker
 *   turn_complete     — a speaker turn was finalised
 *   argument_update   — streaming token from Claude
 *   argument_complete — Claude finished for this turn
 *   error             — server-side error string
 *   session_ended     — graceful session close
 */ // ── Shared types (re-exported for use in React components) ─────────────────
__turbopack_context__.s([
    "ConversationSocket",
    ()=>ConversationSocket
]);
// ── PCM constants ─────────────────────────────────────────────────────────────
const TARGET_SAMPLE_RATE = 16_000;
const SCRIPT_PROCESSOR_BUFFER = 4_096; // ~256 ms at 16 kHz
class ConversationSocket {
    ws = null;
    audioCtx = null;
    sourceNode = null;
    processorNode = null;
    stream = null;
    wsUrl;
    callbacks;
    constructor(wsUrl, callbacks = {}){
        this.wsUrl = wsUrl;
        this.callbacks = callbacks;
    }
    // ── Lifecycle ──────────────────────────────────────────────────────────────
    /** Connect WebSocket, then request mic access and start streaming. */ async connect() {
        await this._openWebSocket();
        await this._startMic();
    }
    /** Send end_session control message and release all resources. */ async disconnect() {
        this._stopMic();
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: "end_session"
            }));
            // Give the server a moment to acknowledge before hard-closing.
            await new Promise((resolve)=>setTimeout(resolve, 300));
            this.ws.close(1000, "user-disconnect");
        }
        this.ws = null;
    }
    // ── Private: WebSocket ─────────────────────────────────────────────────────
    async _openWebSocket() {
        return new Promise((resolve, reject)=>{
            const ws = new WebSocket(this.wsUrl);
            ws.binaryType = "arraybuffer";
            const timeout = setTimeout(()=>{
                ws.close();
                reject(new Error("WebSocket connection timed out"));
            }, 10_000);
            ws.onopen = ()=>{
                clearTimeout(timeout);
                this.ws = ws;
                this.callbacks.onConnected?.();
                resolve();
            };
            ws.onerror = (ev)=>{
                clearTimeout(timeout);
                reject(new Error("WebSocket error during connect"));
            };
            ws.onclose = ()=>{
                this.callbacks.onDisconnected?.();
            };
            ws.onmessage = (ev)=>this._handleServerMessage(ev.data);
        });
    }
    _handleServerMessage(raw) {
        let msg;
        try {
            msg = JSON.parse(raw);
        } catch  {
            console.warn("[ConversationSocket] Non-JSON message:", raw);
            return;
        }
        switch(msg.type){
            case "transcript":
                this.callbacks.onTranscript?.({
                    turnId: msg.turn_id,
                    speaker: msg.speaker,
                    text: msg.text,
                    isPartial: msg.is_partial
                });
                break;
            case "turn_complete":
                this.callbacks.onTurnComplete?.(msg.speaker, msg.turn_id);
                break;
            case "argument_update":
                this.callbacks.onArgumentUpdate?.({
                    turnId: msg.turn_id,
                    speaker: msg.speaker,
                    role: msg.role,
                    delta: msg.delta,
                    isFinal: msg.is_final
                });
                break;
            case "argument_complete":
                this.callbacks.onArgumentComplete?.(msg.speaker, msg.turn_id);
                break;
            case "error":
                console.error("[ConversationSocket] Server error:", msg.message);
                this.callbacks.onError?.(msg.message);
                break;
            case "session_ended":
                this._stopMic();
                this.callbacks.onSessionEnded?.();
                break;
        }
    }
    // ── Private: mic capture ───────────────────────────────────────────────────
    async _startMic() {
        let micStream;
        try {
            micStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    // Request 16 kHz; the browser will resample if needed.
                    sampleRate: TARGET_SAMPLE_RATE
                }
            });
        } catch (err) {
            const message = err instanceof DOMException && err.name === "NotAllowedError" ? "Microphone permission denied. Please allow mic access and try again." : `Could not access microphone: ${err.message}`;
            this.callbacks.onError?.(message);
            throw new Error(message);
        }
        this.stream = micStream;
        // Create an AudioContext that processes audio at exactly 16 kHz.
        this.audioCtx = new AudioContext({
            sampleRate: TARGET_SAMPLE_RATE
        });
        this.sourceNode = this.audioCtx.createMediaStreamSource(micStream);
        // ScriptProcessorNode is deprecated but universally supported.
        // Buffer size 4096 at 16 kHz ≈ 256 ms per callback.
        this.processorNode = this.audioCtx.createScriptProcessor(SCRIPT_PROCESSOR_BUFFER, 1, 1 // output channels
        );
        this.processorNode.onaudioprocess = (ev)=>{
            if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
            const float32 = ev.inputBuffer.getChannelData(0);
            const int16 = _float32ToInt16(float32);
            this.ws.send(int16.buffer);
        };
        // source → processor → destination keeps the graph alive.
        this.sourceNode.connect(this.processorNode);
        this.processorNode.connect(this.audioCtx.destination);
    }
    _stopMic() {
        if (this.processorNode) {
            this.processorNode.disconnect();
            this.processorNode.onaudioprocess = null;
            this.processorNode = null;
        }
        if (this.sourceNode) {
            this.sourceNode.disconnect();
            this.sourceNode = null;
        }
        if (this.audioCtx) {
            this.audioCtx.close().catch(()=>{});
            this.audioCtx = null;
        }
        if (this.stream) {
            this.stream.getTracks().forEach((t)=>t.stop());
            this.stream = null;
        }
    }
}
// ── Utility ───────────────────────────────────────────────────────────────────
/** Convert Float32 PCM samples in [-1, 1] to Int16 little-endian PCM. */ function _float32ToInt16(float32) {
    const out = new Int16Array(float32.length);
    for(let i = 0; i < float32.length; i++){
        const clamped = Math.max(-1, Math.min(1, float32[i]));
        out[i] = clamped < 0 ? clamped * 32_768 : clamped * 32_767;
    }
    return out;
}
}),
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ArgumentPanel$2f$ArgumentPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ArgumentPanel/ArgumentPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TranscriptPanel$2f$TranscriptPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TranscriptPanel/TranscriptPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/socket.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const WS_URL = ("TURBOPACK compile-time value", "ws://localhost:8000/ws/conversation") ?? "ws://localhost:8000/ws/conversation";
function HomePage() {
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Transcript entries keyed by turnId — replaced in-place when final arrives.
    const [transcriptEntries, setTranscriptEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Argument updates per speaker (accumulated; panels accumulate internally).
    const [speakerAUpdates, setSpeakerAUpdates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [speakerBUpdates, setSpeakerBUpdates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // ── Transcript handler ─────────────────────────────────────────────────────
    const handleTranscript = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((entry)=>{
        setTranscriptEntries((prev)=>{
            const idx = prev.findIndex((e)=>e.turnId === entry.turnId);
            if (idx === -1) {
                // New turn — append.
                return [
                    ...prev,
                    entry
                ];
            }
            // Replace the existing entry (partial → final, or partial → updated partial).
            const next = [
                ...prev
            ];
            next[idx] = entry;
            return next;
        });
    }, []);
    // ── Argument update handler ────────────────────────────────────────────────
    const handleArgumentUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((update)=>{
        const setter = update.speaker === "speaker_a" ? setSpeakerAUpdates : setSpeakerBUpdates;
        setter((prev)=>[
                ...prev,
                update
            ]);
    }, []);
    // ── Session lifecycle ──────────────────────────────────────────────────────
    async function handleStartSession() {
        setStatus("connecting");
        setErrorMsg(null);
        setTranscriptEntries([]);
        setSpeakerAUpdates([]);
        setSpeakerBUpdates([]);
        const socket = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConversationSocket"](WS_URL, {
            onConnected: ()=>setStatus("connected"),
            onDisconnected: ()=>{
                setStatus("idle");
                socketRef.current = null;
            },
            onTranscript: handleTranscript,
            onArgumentUpdate: handleArgumentUpdate,
            onTurnComplete: (_speaker, _turnId)=>{
            // No-op: UI updates happen via argument_update events.
            },
            onArgumentComplete: (_speaker, _turnId)=>{
            // No-op: panels lock themselves when isFinal=true.
            },
            onError: (msg)=>{
                setErrorMsg(msg);
                setStatus("error");
            },
            onSessionEnded: ()=>{
                setStatus("idle");
                socketRef.current = null;
            }
        });
        socketRef.current = socket;
        try {
            await socket.connect();
        } catch (err) {
            setStatus("error");
            setErrorMsg(err.message);
            socketRef.current = null;
        }
    }
    async function handleEndSession() {
        if (socketRef.current) {
            await socketRef.current.disconnect();
            socketRef.current = null;
        }
        setStatus("idle");
    }
    // Clean up on unmount.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            socketRef.current?.disconnect().catch(()=>{});
        };
    }, []);
    // ── Render ─────────────────────────────────────────────────────────────────
    const isConnected = status === "connected";
    const isConnecting = status === "connecting";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: styles.main,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: styles.header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: styles.title,
                        children: "Conversation Analysis"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.controls,
                        children: [
                            errorMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: styles.errorBadge,
                                children: errorMsg
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 126,
                                columnNumber: 24
                            }, this),
                            !isConnected && !isConnecting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: styles.btnStart,
                                onClick: handleStartSession,
                                children: "Start Session"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this) : isConnecting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: {
                                    ...styles.btnStart,
                                    opacity: 0.6
                                },
                                disabled: true,
                                children: "Connecting…"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 133,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: styles.btnEnd,
                                onClick: handleEndSession,
                                children: "End Session"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 137,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this),
            isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.recordingBar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: styles.recordingDot
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: styles.recordingLabel,
                        children: "Recording — speak now"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 146,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.body,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        style: styles.transcriptSection,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TranscriptPanel$2f$TranscriptPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TranscriptPanel"], {
                            entries: transcriptEntries
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        style: styles.argumentsSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ArgumentPanel$2f$ArgumentPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArgumentPanel"], {
                                speaker: "speaker_a",
                                label: "Speaker A",
                                updates: speakerAUpdates
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ArgumentPanel$2f$ArgumentPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArgumentPanel"], {
                                speaker: "speaker_b",
                                label: "Speaker B",
                                updates: speakerBUpdates
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 121,
        columnNumber: 5
    }, this);
}
// ── Styles ─────────────────────────────────────────────────────────────────────
const styles = {
    main: {
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        padding: "1.5rem",
        gap: "1rem",
        maxWidth: "1400px",
        margin: "0 auto"
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexShrink: 0
    },
    title: {
        fontSize: "1.25rem",
        fontWeight: 600,
        letterSpacing: "-0.02em"
    },
    controls: {
        display: "flex",
        alignItems: "center",
        gap: "0.75rem"
    },
    errorBadge: {
        fontSize: "0.8rem",
        color: "#ff6b6b",
        maxWidth: "360px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
    },
    btnStart: {
        padding: "0.5rem 1.25rem",
        borderRadius: "8px",
        border: "none",
        background: "#4f9eff",
        color: "#fff",
        fontWeight: 600,
        cursor: "pointer",
        fontSize: "0.875rem",
        transition: "opacity 0.15s"
    },
    btnEnd: {
        padding: "0.5rem 1.25rem",
        borderRadius: "8px",
        border: "none",
        background: "#ff6b6b",
        color: "#fff",
        fontWeight: 600,
        cursor: "pointer",
        fontSize: "0.875rem"
    },
    recordingBar: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        flexShrink: 0
    },
    recordingDot: {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: "#ff6b6b",
        animation: "pulse 1.4s ease-in-out infinite",
        display: "inline-block"
    },
    recordingLabel: {
        fontSize: "0.75rem",
        color: "var(--color-text-muted)",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        fontWeight: 500
    },
    body: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: "1.25rem",
        minHeight: 0
    },
    transcriptSection: {
        flex: "0 0 38%",
        minHeight: 0
    },
    argumentsSection: {
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1.25rem",
        minHeight: 0
    }
};
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=_683e5e81._.js.map