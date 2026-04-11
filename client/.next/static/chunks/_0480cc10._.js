(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ArgumentPanel/ArgumentPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArgumentPanel",
    ()=>ArgumentPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function ArgumentPanel(param) {
    let { speaker, label, updates } = param;
    _s();
    const speakerColor = speaker === "speaker_a" ? "var(--color-speaker-a)" : "var(--color-speaker-b)";
    const { argumentText, counterText, isArgumentFinal, isCounterFinal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ArgumentPanel.useMemo": ()=>_accumulateUpdates(updates)
    }["ArgumentPanel.useMemo"], [
        updates
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.body,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.divider
                    }, void 0, false, {
                        fileName: "[project]/components/ArgumentPanel/ArgumentPanel.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
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
_s(ArgumentPanel, "X6wUChobkyQpu4na3ORa4dPyeZs=");
_c = ArgumentPanel;
function Section(param) {
    let { title, text, isFinal, accentColor, emptyLabel } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.section,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
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
            text ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: styles.sectionText,
                children: [
                    text,
                    !isFinal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
_c1 = Section;
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
var _c, _c1;
__turbopack_context__.k.register(_c, "ArgumentPanel");
__turbopack_context__.k.register(_c1, "Section");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/TranscriptPanel/TranscriptPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TranscriptPanel",
    ()=>TranscriptPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function TranscriptPanel(param) {
    let { entries } = param;
    _s();
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Auto-scroll to bottom whenever entries change.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TranscriptPanel.useEffect": ()=>{
            var _bottomRef_current;
            (_bottomRef_current = bottomRef.current) === null || _bottomRef_current === void 0 ? void 0 : _bottomRef_current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["TranscriptPanel.useEffect"], [
        entries
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: styles.container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: styles.heading,
                children: "Live Transcript"
            }, void 0, false, {
                fileName: "[project]/components/TranscriptPanel/TranscriptPanel.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.scroll,
                children: [
                    entries.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: styles.empty,
                        children: "Transcript will appear here once the session starts…"
                    }, void 0, false, {
                        fileName: "[project]/components/TranscriptPanel/TranscriptPanel.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this),
                    entries.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TurnBlock, {
                            entry: entry
                        }, entry.turnId, false, {
                            fileName: "[project]/components/TranscriptPanel/TranscriptPanel.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(TranscriptPanel, "eaUWg0io6wE0buoFSqU1QLjVsUo=");
_c = TranscriptPanel;
function TurnBlock(param) {
    let { entry } = param;
    const speakerColor = entry.speaker === "speaker_a" ? "var(--color-speaker-a)" : entry.speaker === "speaker_b" ? "var(--color-speaker-b)" : "var(--color-text-muted)";
    const label = entry.speaker === "speaker_a" ? "Speaker A" : entry.speaker === "speaker_b" ? "Speaker B" : "…";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            ...styles.turn,
            borderLeftColor: speakerColor
        },
        children: [
            entry.speaker !== "unknown" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: styles.turnText,
                children: [
                    entry.text,
                    entry.isPartial && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
_c1 = TurnBlock;
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
var _c, _c1;
__turbopack_context__.k.register(_c, "TranscriptPanel");
__turbopack_context__.k.register(_c1, "TurnBlock");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/socket.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
;
// ── PCM constants ─────────────────────────────────────────────────────────────
const TARGET_SAMPLE_RATE = 16_000;
const SCRIPT_PROCESSOR_BUFFER = 4_096; // ~256 ms at 16 kHz
class ConversationSocket {
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
                var _this_callbacks_onConnected, _this_callbacks;
                clearTimeout(timeout);
                this.ws = ws;
                (_this_callbacks_onConnected = (_this_callbacks = this.callbacks).onConnected) === null || _this_callbacks_onConnected === void 0 ? void 0 : _this_callbacks_onConnected.call(_this_callbacks);
                resolve();
            };
            ws.onerror = (ev)=>{
                clearTimeout(timeout);
                reject(new Error("WebSocket error during connect"));
            };
            ws.onclose = ()=>{
                var _this_callbacks_onDisconnected, _this_callbacks;
                (_this_callbacks_onDisconnected = (_this_callbacks = this.callbacks).onDisconnected) === null || _this_callbacks_onDisconnected === void 0 ? void 0 : _this_callbacks_onDisconnected.call(_this_callbacks);
            };
            ws.onmessage = (ev)=>this._handleServerMessage(ev.data);
        });
    }
    _handleServerMessage(raw) {
        let msg;
        try {
            msg = JSON.parse(raw);
        } catch (e) {
            console.warn("[ConversationSocket] Non-JSON message:", raw);
            return;
        }
        switch(msg.type){
            case "transcript":
                var _this_callbacks_onTranscript, _this_callbacks;
                (_this_callbacks_onTranscript = (_this_callbacks = this.callbacks).onTranscript) === null || _this_callbacks_onTranscript === void 0 ? void 0 : _this_callbacks_onTranscript.call(_this_callbacks, {
                    turnId: msg.turn_id,
                    speaker: msg.speaker,
                    text: msg.text,
                    isPartial: msg.is_partial
                });
                break;
            case "turn_complete":
                var _this_callbacks_onTurnComplete, _this_callbacks1;
                (_this_callbacks_onTurnComplete = (_this_callbacks1 = this.callbacks).onTurnComplete) === null || _this_callbacks_onTurnComplete === void 0 ? void 0 : _this_callbacks_onTurnComplete.call(_this_callbacks1, msg.speaker, msg.turn_id);
                break;
            case "argument_update":
                var _this_callbacks_onArgumentUpdate, _this_callbacks2;
                (_this_callbacks_onArgumentUpdate = (_this_callbacks2 = this.callbacks).onArgumentUpdate) === null || _this_callbacks_onArgumentUpdate === void 0 ? void 0 : _this_callbacks_onArgumentUpdate.call(_this_callbacks2, {
                    turnId: msg.turn_id,
                    speaker: msg.speaker,
                    role: msg.role,
                    delta: msg.delta,
                    isFinal: msg.is_final
                });
                break;
            case "argument_complete":
                var _this_callbacks_onArgumentComplete, _this_callbacks3;
                (_this_callbacks_onArgumentComplete = (_this_callbacks3 = this.callbacks).onArgumentComplete) === null || _this_callbacks_onArgumentComplete === void 0 ? void 0 : _this_callbacks_onArgumentComplete.call(_this_callbacks3, msg.speaker, msg.turn_id);
                break;
            case "error":
                var _this_callbacks_onError, _this_callbacks4;
                console.error("[ConversationSocket] Server error:", msg.message);
                (_this_callbacks_onError = (_this_callbacks4 = this.callbacks).onError) === null || _this_callbacks_onError === void 0 ? void 0 : _this_callbacks_onError.call(_this_callbacks4, msg.message);
                break;
            case "session_ended":
                var _this_callbacks_onSessionEnded, _this_callbacks5;
                this._stopMic();
                (_this_callbacks_onSessionEnded = (_this_callbacks5 = this.callbacks).onSessionEnded) === null || _this_callbacks_onSessionEnded === void 0 ? void 0 : _this_callbacks_onSessionEnded.call(_this_callbacks5);
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
            var _this_callbacks_onError, _this_callbacks;
            const message = err instanceof DOMException && err.name === "NotAllowedError" ? "Microphone permission denied. Please allow mic access and try again." : "Could not access microphone: ".concat(err.message);
            (_this_callbacks_onError = (_this_callbacks = this.callbacks).onError) === null || _this_callbacks_onError === void 0 ? void 0 : _this_callbacks_onError.call(_this_callbacks, message);
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
    constructor(wsUrl, callbacks = {}){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "ws", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "audioCtx", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "sourceNode", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "processorNode", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "stream", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "wsUrl", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "callbacks", void 0);
        this.wsUrl = wsUrl;
        this.callbacks = callbacks;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ArgumentPanel$2f$ArgumentPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ArgumentPanel/ArgumentPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TranscriptPanel$2f$TranscriptPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TranscriptPanel/TranscriptPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/socket.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
var _process_env_NEXT_PUBLIC_WS_URL;
const WS_URL = (_process_env_NEXT_PUBLIC_WS_URL = ("TURBOPACK compile-time value", "ws://localhost:8000/ws/conversation")) !== null && _process_env_NEXT_PUBLIC_WS_URL !== void 0 ? _process_env_NEXT_PUBLIC_WS_URL : "ws://localhost:8000/ws/conversation";
function HomePage() {
    _s();
    const socketRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Transcript entries keyed by turnId — replaced in-place when final arrives.
    const [transcriptEntries, setTranscriptEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Argument updates per speaker (accumulated; panels accumulate internally).
    const [speakerAUpdates, setSpeakerAUpdates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [speakerBUpdates, setSpeakerBUpdates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // ── Transcript handler ─────────────────────────────────────────────────────
    const handleTranscript = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomePage.useCallback[handleTranscript]": (entry)=>{
            setTranscriptEntries({
                "HomePage.useCallback[handleTranscript]": (prev)=>{
                    const idx = prev.findIndex({
                        "HomePage.useCallback[handleTranscript].idx": (e)=>e.turnId === entry.turnId
                    }["HomePage.useCallback[handleTranscript].idx"]);
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
                }
            }["HomePage.useCallback[handleTranscript]"]);
        }
    }["HomePage.useCallback[handleTranscript]"], []);
    // ── Argument update handler ────────────────────────────────────────────────
    const handleArgumentUpdate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomePage.useCallback[handleArgumentUpdate]": (update)=>{
            const setter = update.speaker === "speaker_a" ? setSpeakerAUpdates : setSpeakerBUpdates;
            setter({
                "HomePage.useCallback[handleArgumentUpdate]": (prev)=>[
                        ...prev,
                        update
                    ]
            }["HomePage.useCallback[handleArgumentUpdate]"]);
        }
    }["HomePage.useCallback[handleArgumentUpdate]"], []);
    // ── Session lifecycle ──────────────────────────────────────────────────────
    async function handleStartSession() {
        setStatus("connecting");
        setErrorMsg(null);
        setTranscriptEntries([]);
        setSpeakerAUpdates([]);
        setSpeakerBUpdates([]);
        const socket = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConversationSocket"](WS_URL, {
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomePage.useEffect": ()=>{
            return ({
                "HomePage.useEffect": ()=>{
                    var _socketRef_current;
                    (_socketRef_current = socketRef.current) === null || _socketRef_current === void 0 ? void 0 : _socketRef_current.disconnect().catch({
                        "HomePage.useEffect": ()=>{}
                    }["HomePage.useEffect"]);
                }
            })["HomePage.useEffect"];
        }
    }["HomePage.useEffect"], []);
    // ── Render ─────────────────────────────────────────────────────────────────
    const isConnected = status === "connected";
    const isConnecting = status === "connecting";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: styles.main,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: styles.header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: styles.title,
                        children: "Conversation Analysis"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: styles.controls,
                        children: [
                            errorMsg && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: styles.errorBadge,
                                children: errorMsg
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 126,
                                columnNumber: 24
                            }, this),
                            !isConnected && !isConnecting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                style: styles.btnStart,
                                onClick: handleStartSession,
                                children: "Start Session"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 129,
                                columnNumber: 13
                            }, this) : isConnecting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
            isConnected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.recordingBar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: styles.recordingDot
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 147,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: styles.body,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        style: styles.transcriptSection,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TranscriptPanel$2f$TranscriptPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TranscriptPanel"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        style: styles.argumentsSection,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ArgumentPanel$2f$ArgumentPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArgumentPanel"], {
                                speaker: "speaker_a",
                                label: "Speaker A",
                                updates: speakerAUpdates
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ArgumentPanel$2f$ArgumentPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArgumentPanel"], {
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
_s(HomePage, "cCyjIjydClkBVe7JTnxBBY+sQkE=");
_c = HomePage;
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
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "_",
    ()=>_define_property
]);
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
;
}),
]);

//# sourceMappingURL=_0480cc10._.js.map