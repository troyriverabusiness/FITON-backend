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
 * captures microphone audio for forwarding.
 *
 * Audio pipeline:
 *   getUserMedia → MediaRecorder (webm/opus)
 *   → user holds record button → chunks accumulated
 *   → user releases → complete Blob → ArrayBuffer → binary WebSocket frame
 *   → server → pyannote diarization → faster-whisper transcription → Claude
 *
 * Server → browser message types:
 *   processing       — audio received, being analysed
 *   no_speech        — nothing detected in the recording
 *   transcript       — diarized + transcribed segment per speaker
 *   turn_complete    — a speaker turn was finalised
 *   argument_update  — streaming token from Claude
 *   argument_complete — Claude finished for this turn
 *   error            — server-side error string
 *   session_ended    — graceful session close
 */ // ── Shared types ───────────────────────────────────────────────────────────────
__turbopack_context__.s([
    "ConversationSocket",
    ()=>ConversationSocket
]);
class ConversationSocket {
    ws = null;
    mediaRecorder = null;
    chunks = [];
    micStream = null;
    wsUrl;
    callbacks;
    constructor(wsUrl, callbacks = {}){
        this.wsUrl = wsUrl;
        this.callbacks = callbacks;
    }
    // ── Lifecycle ──────────────────────────────────────────────────────────────
    async connect() {
        await this._openWebSocket();
        // Request mic permission up front so there's no delay on first hold.
        await this._initMic();
    }
    async disconnect() {
        this.stopRecording();
        this._releaseMic();
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                type: "end_session"
            }));
            await new Promise((resolve)=>setTimeout(resolve, 300));
            this.ws.close(1000, "user-disconnect");
        }
        this.ws = null;
    }
    // ── Recording ──────────────────────────────────────────────────────────────
    /** Start capturing audio. Call when the user presses the record button. */ startRecording() {
        if (!this.micStream) {
            console.warn("[Socket] startRecording called but no mic stream");
            return;
        }
        if (this.mediaRecorder?.state === "recording") return;
        this.chunks = [];
        const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? "audio/webm;codecs=opus" : "audio/webm";
        console.log("[Socket] Recording started — mimeType:", mimeType);
        const recorder = new MediaRecorder(this.micStream, {
            mimeType
        });
        recorder.ondataavailable = (e)=>{
            if (e.data.size > 0) this.chunks.push(e.data);
        };
        recorder.onstop = ()=>{
            const blob = new Blob(this.chunks, {
                type: "audio/webm"
            });
            console.log("[Socket] Recording stopped —", (blob.size / 1024).toFixed(1), "KB, sending…");
            this.chunks = [];
            this._sendBlob(blob);
        };
        this.mediaRecorder = recorder;
        recorder.start();
    }
    /** Stop capturing and send the recording. Call on button release. */ stopRecording() {
        if (this.mediaRecorder?.state === "recording") {
            console.log("[Socket] Stopping recording…");
            this.mediaRecorder.stop();
        }
        this.mediaRecorder = null;
    }
    get isRecording() {
        return this.mediaRecorder?.state === "recording";
    }
    // ── Private ────────────────────────────────────────────────────────────────
    async _openWebSocket() {
        console.log("[Socket] Connecting to", this.wsUrl);
        return new Promise((resolve, reject)=>{
            const ws = new WebSocket(this.wsUrl);
            const timeout = setTimeout(()=>{
                ws.close();
                reject(new Error("WebSocket connection timed out"));
            }, 10_000);
            ws.onopen = ()=>{
                clearTimeout(timeout);
                this.ws = ws;
                console.log("[Socket] Connected");
                this.callbacks.onConnected?.();
                resolve();
            };
            ws.onerror = (ev)=>{
                clearTimeout(timeout);
                console.error("[Socket] Connection error", ev);
                reject(new Error("WebSocket connection failed"));
            };
            ws.onclose = (ev)=>{
                console.log("[Socket] Closed — code:", ev.code, "reason:", ev.reason);
                this.callbacks.onDisconnected?.();
            };
            ws.onmessage = (ev)=>this._handleMessage(ev.data);
        });
    }
    async _initMic() {
        console.log("[Socket] Requesting microphone…");
        try {
            this.micStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    channelCount: 1,
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 16_000
                }
            });
            console.log("[Socket] Microphone granted");
        } catch (err) {
            const msg = err instanceof DOMException && err.name === "NotAllowedError" ? "Microphone permission denied. Please allow mic access and try again." : `Could not access microphone: ${err.message}`;
            console.error("[Socket] Mic error:", msg);
            this.callbacks.onError?.(msg);
            throw new Error(msg);
        }
    }
    _releaseMic() {
        this.micStream?.getTracks().forEach((t)=>t.stop());
        this.micStream = null;
        console.log("[Socket] Microphone released");
    }
    _sendBlob(blob) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.warn("[Socket] Cannot send — WebSocket not open");
            return;
        }
        console.log("[Socket] Sending audio blob —", (blob.size / 1024).toFixed(1), "KB");
        blob.arrayBuffer().then((buf)=>this.ws?.send(buf));
    }
    _handleMessage(raw) {
        let msg;
        try {
            msg = JSON.parse(raw);
        } catch  {
            console.warn("[Socket] Non-JSON message:", raw);
            return;
        }
        console.log("[Socket] ←", msg.type, msg);
        switch(msg.type){
            case "processing":
                this.callbacks.onProcessing?.();
                break;
            case "no_speech":
                console.warn("[Socket] No speech detected in recording");
                this.callbacks.onNoSpeech?.();
                break;
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
                console.error("[Socket] Server error:", msg.message);
                this.callbacks.onError?.(msg.message);
                break;
            case "session_ended":
                this._releaseMic();
                this.callbacks.onSessionEnded?.();
                break;
        }
    }
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
    const [recordState, setRecordState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [transcriptEntries, setTranscriptEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [speakerAUpdates, setSpeakerAUpdates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [speakerBUpdates, setSpeakerBUpdates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // ── Transcript handler ─────────────────────────────────────────────────────
    const handleTranscript = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((entry)=>{
        setTranscriptEntries((prev)=>{
            const idx = prev.findIndex((e)=>e.turnId === entry.turnId);
            if (idx === -1) return [
                ...prev,
                entry
            ];
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
        setRecordState("idle");
        const socket = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConversationSocket"](WS_URL, {
            onConnected: ()=>setStatus("connected"),
            onDisconnected: ()=>{
                setStatus("idle");
                setRecordState("idle");
                socketRef.current = null;
            },
            onTranscript: handleTranscript,
            onArgumentUpdate: handleArgumentUpdate,
            onTurnComplete: ()=>{},
            onArgumentComplete: ()=>{},
            onProcessing: ()=>setRecordState("processing"),
            onNoSpeech: ()=>setRecordState("idle"),
            onError: (msg)=>{
                setErrorMsg(msg);
                setStatus("error");
                setRecordState("idle");
            },
            onSessionEnded: ()=>{
                setStatus("idle");
                setRecordState("idle");
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
        setRecordState("idle");
    }
    // ── Recording ──────────────────────────────────────────────────────────────
    function handlePressRecord() {
        if (recordState !== "idle") return;
        socketRef.current?.startRecording();
        setRecordState("recording");
    }
    function handleReleaseRecord() {
        if (recordState !== "recording") return;
        socketRef.current?.stopRecording();
    // stays "processing" until the server responds
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            socketRef.current?.disconnect().catch(()=>{});
        };
    }, []);
    // ── Render ─────────────────────────────────────────────────────────────────
    const isConnected = status === "connected";
    const isConnecting = status === "connecting";
    const recordLabel = recordState === "recording" ? "🎙 Recording… release to send" : recordState === "processing" ? "Analysing…" : "Hold to record — both speakers";
    const recordColor = recordState === "recording" ? "#ff6b6b" : recordState === "processing" ? "#f5a623" : "#4f9eff";
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
                        lineNumber: 139,
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
                                lineNumber: 142,
                                columnNumber: 24
                            }, this),
                            !isConnected && !isConnecting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: styles.btnStart,
                                onClick: handleStartSession,
                                children: "Start Session"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 145,
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
                                lineNumber: 149,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: styles.btnEnd,
                                onClick: handleEndSession,
                                children: "End Session"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.recordRow,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.statusBar,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    ...styles.dot,
                                    background: recordColor,
                                    animation: recordState === "idle" ? "none" : "pulse 1.4s ease-in-out infinite"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 163,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: styles.statusLabel,
                                children: recordLabel
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 170,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 162,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        style: {
                            ...styles.recordBtn,
                            background: recordState === "recording" ? "#ff6b6b" : recordState === "processing" ? "#f5a623" : "#4f9eff",
                            opacity: recordState === "processing" ? 0.6 : 1,
                            cursor: recordState === "processing" ? "default" : "pointer"
                        },
                        onMouseDown: handlePressRecord,
                        onMouseUp: handleReleaseRecord,
                        onMouseLeave: ()=>{
                            if (recordState === "recording") handleReleaseRecord();
                        },
                        onTouchStart: (e)=>{
                            e.preventDefault();
                            handlePressRecord();
                        },
                        onTouchEnd: handleReleaseRecord,
                        disabled: recordState === "processing",
                        children: recordState === "recording" ? "Release to send" : recordState === "processing" ? "Analysing…" : "Hold to record"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: styles.hint,
                        children: "Both speakers can talk — pyannote detects who said what automatically."
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 161,
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
                            lineNumber: 204,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 203,
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
                                lineNumber: 207,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ArgumentPanel$2f$ArgumentPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArgumentPanel"], {
                                speaker: "speaker_b",
                                label: "Speaker B",
                                updates: speakerBUpdates
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 137,
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
    recordRow: {
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        flexShrink: 0
    },
    statusBar: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
    },
    dot: {
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        display: "inline-block",
        flexShrink: 0
    },
    statusLabel: {
        fontSize: "0.75rem",
        color: "var(--color-text-muted)",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        fontWeight: 500
    },
    recordBtn: {
        padding: "0.9rem 1rem",
        borderRadius: "10px",
        border: "none",
        color: "#fff",
        fontWeight: 700,
        fontSize: "1rem",
        transition: "background 0.1s",
        userSelect: "none",
        WebkitUserSelect: "none"
    },
    hint: {
        fontSize: "0.75rem",
        color: "var(--color-text-muted)",
        margin: 0
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