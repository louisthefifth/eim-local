import { useState } from "react";
import {
  ChevronDown, ChevronRight, GripVertical, Plus, Eye, Save,
  Settings, BarChart3, Layers, FileText, Hash, AlignLeft,
  ChevronDownSquare, Upload, Link, List, DollarSign, Sparkles,
  AlertCircle, Clock, CheckSquare, ClipboardCheck, PenLine
} from "lucide-react";

var c = {
  bg: "#111113", bgSub: "#18181b", bgEl: "#1e1e22", bgElHover: "#252529",
  bgElActive: "#2b2b30", border: "#2e2e33", borderSub: "#3a3a40",
  borderHover: "#4a4a52", text: "#ededef", textSec: "#a0a0ab",
  textTer: "#6e6e7a", textQuad: "#4e4e58",
  accent: "#2dd4bf", accentDim: "rgba(45,212,191,0.1)", accentBorder: "rgba(45,212,191,0.25)",
  red: "#ef4444", redDim: "rgba(239,68,68,0.1)", white: "#fff",
};

var rad = { sm: 6, md: 8 };

var WORKFLOWS = [
  { id: "product-request", name: "Product Request", active: 7 },
  { id: "renewals", name: "Renewals", active: 5 },
  { id: "offboarding", name: "Offboarding", active: 4 },
  { id: "dpia", name: "DPIA", active: 3 },
];

function mkIntake() {
  return [
    { id: "ic1", name: "Product Information", enabled: true, expanded: false, questions: [
      { id: "q1", label: "Product name", type: "Text", req: true },
      { id: "q2", label: "Product category", type: "Dropdown", req: true },
      { id: "q3", label: "Vendor name", type: "Text", req: true },
      { id: "q4", label: "Brief description", type: "Textarea", req: true },
      { id: "q5", label: "Age range / key stages", type: "Multi-select", req: false },
      { id: "q6", label: "Subjects supported", type: "Multi-select", req: false },
      { id: "q7", label: "Product website URL", type: "URL", req: false },
      { id: "q8", label: "Screenshots or media", type: "File upload", req: false },
    ]},
    { id: "ic2", name: "Educational Purpose", enabled: true, expanded: false, questions: [
      { id: "q9", label: "What problem does this solve?", type: "Textarea", req: true },
      { id: "q10", label: "Who will use it?", type: "Dropdown", req: true },
      { id: "q11", label: "Which schools or departments?", type: "Multi-select", req: true },
      { id: "q12", label: "Describe the intended use case", type: "Textarea", req: true },
      { id: "q13", label: "Existing tools this replaces or overlaps with", type: "Textarea", req: false },
      { id: "q14", label: "Evidence of effectiveness", type: "Textarea", req: false },
    ]},
    { id: "ic3", name: "Technical Requirements", enabled: true, expanded: false, questions: [
      { id: "q15", label: "SSO integration required?", type: "Dropdown", req: true },
      { id: "q16", label: "LMS / SIS integration needed?", type: "Dropdown", req: false },
      { id: "q17", label: "Device compatibility", type: "Multi-select", req: true },
      { id: "q18", label: "Bandwidth requirements", type: "Dropdown", req: false },
      { id: "q19", label: "Offline capability", type: "Dropdown", req: false },
      { id: "q20", label: "Data export formats", type: "Text", req: false },
    ]},
    { id: "ic4", name: "Data & Compliance", enabled: true, expanded: false, questions: [
      { id: "q21", label: "Processes personal student data?", type: "Dropdown", req: true },
      { id: "q22", label: "Processes staff data?", type: "Dropdown", req: true },
      { id: "q23", label: "Uses AI? Type?", type: "Dropdown", req: true },
      { id: "q24", label: "Data storage location", type: "Text", req: true },
      { id: "q25", label: "Privacy policy provided?", type: "Dropdown", req: true },
      { id: "q26", label: "Supporting documents", type: "File upload", req: false },
    ]},
    { id: "ic5", name: "Finance & Cost", enabled: true, expanded: false, questions: [
      { id: "q27", label: "Annual cost", type: "Currency", req: true },
      { id: "q28", label: "Budget source / cost centre", type: "Dropdown", req: true },
      { id: "q29", label: "Licence model", type: "Dropdown", req: true },
      { id: "q30", label: "Number of licences needed", type: "Number", req: true },
      { id: "q31", label: "Free trial available?", type: "Dropdown", req: false },
      { id: "q32", label: "Contract length", type: "Dropdown", req: true },
    ]},
    { id: "ic6", name: "Contacts", enabled: true, expanded: false, questions: [
      { id: "q33", label: "Internal sponsor / champion", type: "Text", req: true },
      { id: "q34", label: "Head of Department sign-off", type: "Text", req: false },
      { id: "q35", label: "Vendor account manager", type: "Text", req: false },
      { id: "q36", label: "Implementation lead", type: "Text", req: false },
    ]},
  ];
}

function mkAssess() {
  return [
    { id: "ac1", name: "Evidence", enabled: true, expanded: false, dataSource: "Evidence tab", stages: [
      { id: "s1", name: "Evidence Based", sla: "5 days", method: "Scoring Rubric", role: "Curriculum Director", enabled: true },
      { id: "s2", name: "Inclusive", sla: "3 days", method: "Checklist (8 items)", role: "Curriculum Director", enabled: true },
    ]},
    { id: "ac2", name: "IT", enabled: true, expanded: false, dataSource: "Requirements tab", stages: [
      { id: "s3", name: "Interoperable", sla: "5 days", method: "Checklist (6 items)", role: "IT Admin", enabled: true },
      { id: "s4", name: "Usable", sla: "3 days", method: "Sign off", role: "IT Admin", enabled: true },
    ]},
    { id: "ac3", name: "Finance", enabled: true, expanded: false, dataSource: "Subscriptions tab", stages: [
      { id: "s5", name: "Cost / ROI Review", sla: "5 days", method: "Scoring Rubric", role: "Finance Team", enabled: true },
    ]},
    { id: "ac4", name: "Compliance", enabled: true, expanded: false, dataSource: "Compliance tab", stages: [
      { id: "s6", name: "Safe", sla: "7 days", method: "Checklist (12 items)", role: "Compliance Officer", enabled: true },
      { id: "s7", name: "DPIA", sla: "10 days", method: "Sign off", role: "Compliance Officer", enabled: true },
    ]},
    { id: "ac5", name: "Final", enabled: true, expanded: false, dataSource: null, stages: [
      { id: "s8", name: "Final Approval", sla: "3 days", method: "Sign off", role: "Group Admin", enabled: true },
    ]},
  ];
}

function Badge({ children, variant }) {
  var v = variant || "default";
  var sMap = {
    default: { background: c.bgElActive, color: c.textSec, border: "1px solid " + c.border },
    accent: { background: c.accentDim, color: c.accent, border: "1px solid " + c.accentBorder },
    count: { background: c.accentDim, color: c.accent, border: "1px solid " + c.accentBorder, minWidth: 22, textAlign: "center" },
    muted: { background: "transparent", color: c.textTer, border: "1px solid " + c.border },
    required: { background: "transparent", color: c.textTer, border: "1px solid " + c.borderSub },
  };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px",
      borderRadius: 999, fontSize: 11, fontWeight: 500, lineHeight: "18px", whiteSpace: "nowrap",
      ...sMap[v]
    }}>
      {children}
    </span>
  );
}

function Toggle({ on, onToggle, size }) {
  var sz = size || 18;
  var w = sz * 2.1;
  var h = sz * 1.15;
  var dot = sz * 0.75;
  var offset = (h - dot) / 2;
  return (
    <button
      onClick={function(e) { e.stopPropagation(); onToggle(); }}
      style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center" }}
    >
      <div style={{
        width: w, height: h, borderRadius: h, position: "relative", cursor: "pointer",
        background: on ? c.accent : c.borderSub, transition: "background 0.15s"
      }}>
        <div style={{
          width: dot, height: dot, borderRadius: "50%", background: c.white,
          position: "absolute", top: offset,
          left: on ? w - dot - offset : offset, transition: "left 0.15s"
        }} />
      </div>
    </button>
  );
}

function FieldTypeIcon({ type }) {
  var iconMap = {
    Text: FileText, Textarea: AlignLeft, Dropdown: ChevronDownSquare,
    "Multi-select": List, "File upload": Upload, URL: Link,
    Currency: DollarSign, Number: Hash
  };
  var Ic = iconMap[type] || FileText;
  return <Ic size={13} color={c.textTer} strokeWidth={1.8} />;
}

function MethodIcon({ method }) {
  if (method.includes("Scoring")) return <BarChart3 size={13} strokeWidth={1.8} />;
  if (method.includes("Checklist")) return <CheckSquare size={13} strokeWidth={1.8} />;
  return <PenLine size={13} strokeWidth={1.8} />;
}

function PhaseHeader({ icon, label, description, count, onAdd }) {
  var Ic = icon;
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "20px 0 12px", borderBottom: "1px solid " + c.border, marginBottom: 2
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 30, height: 30, borderRadius: rad.sm, background: c.bgElActive
        }}>
          <Ic size={15} color={c.textSec} strokeWidth={1.8} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: c.text, letterSpacing: "-0.01em" }}>{label}</span>
          <span style={{ fontSize: 11, color: c.textTer, fontWeight: 400 }}>{description}</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, color: c.textTer }}>{count} categories</span>
        <button
          onClick={onAdd}
          style={{
            display: "flex", alignItems: "center", gap: 5, background: "transparent",
            border: "1px solid " + c.border, color: c.textSec, padding: "5px 12px",
            borderRadius: rad.sm, fontSize: 12, fontWeight: 500, cursor: "pointer"
          }}
        >
          <Plus size={13} strokeWidth={2} /> Add category
        </button>
      </div>
    </div>
  );
}

function IntakeCategory({ cat, onToggle, onToggleExpand }) {
  var qCount = cat.questions.length;
  var reqCount = cat.questions.filter(function(q) { return q.req; }).length;

  return (
    <div style={{ marginTop: 2, opacity: cat.enabled ? 1 : 0.45, transition: "opacity 0.2s" }}>
      <div
        onClick={function() { onToggleExpand(cat.id); }}
        style={{
          display: "flex", alignItems: "center", gap: 0, padding: "10px 12px",
          background: cat.expanded ? c.bgEl : "transparent",
          borderRadius: cat.expanded ? (rad.md + "px " + rad.md + "px 0 0") : rad.md,
          cursor: "pointer", transition: "background 0.1s",
          borderBottom: cat.expanded ? ("1px solid " + c.border) : "1px solid transparent"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "0 4px 0 0", color: c.textQuad }}>
          <GripVertical size={14} strokeWidth={1.5} />
        </div>
        <div style={{ color: c.textTer, display: "flex", alignItems: "center", marginRight: 8 }}>
          {cat.expanded ? <ChevronDown size={15} strokeWidth={1.8} /> : <ChevronRight size={15} strokeWidth={1.8} />}
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: c.text, flex: 1 }}>{cat.name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Badge variant="muted">{qCount} questions</Badge>
          {reqCount > 0 && <Badge variant="required">{reqCount} required</Badge>}
          <Toggle on={cat.enabled} onToggle={function() { onToggle(cat.id); }} />
        </div>
      </div>
      {cat.expanded && (
        <div style={{ background: c.bgEl, borderRadius: "0 0 " + rad.md + "px " + rad.md + "px", padding: "4px 0 8px" }}>
          {cat.questions.map(function(q, i) {
            return (
              <div
                key={q.id}
                style={{ display: "flex", alignItems: "center", gap: 0, padding: "7px 12px 7px 16px" }}
              >
                <div style={{ color: c.textQuad, display: "flex", alignItems: "center", padding: "0 6px 0 0" }}>
                  <GripVertical size={12} strokeWidth={1.5} />
                </div>
                <span style={{ fontSize: 11, color: c.textTer, width: 20, flexShrink: 0 }}>{i + 1}.</span>
                <span style={{ fontSize: 12.5, color: c.text, flex: 1 }}>{q.label}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 12 }}>
                  {q.req && <span style={{ fontSize: 10, color: c.accent, fontWeight: 500 }}>Required</span>}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 4, padding: "2px 8px",
                    background: c.bgElActive, borderRadius: 4, border: "1px solid " + c.border
                  }}>
                    <FieldTypeIcon type={q.type} />
                    <span style={{ fontSize: 11, color: c.textSec }}>{q.type}</span>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ padding: "8px 16px 4px 42px" }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 4, background: "transparent",
              border: "none", color: c.textTer, fontSize: 12, cursor: "pointer", padding: "4px 0"
            }}>
              <Plus size={13} strokeWidth={2} /> Add question
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AssessCategory({ cat, onToggle, onToggleExpand, onToggleStage }) {
  return (
    <div style={{ marginTop: 2, opacity: cat.enabled ? 1 : 0.45, transition: "opacity 0.2s" }}>
      <div
        onClick={function() { onToggleExpand(cat.id); }}
        style={{
          display: "flex", alignItems: "center", gap: 0, padding: "10px 12px",
          background: cat.expanded ? c.bgEl : "transparent",
          borderRadius: cat.expanded ? (rad.md + "px " + rad.md + "px 0 0") : rad.md,
          cursor: "pointer", transition: "background 0.1s",
          borderBottom: cat.expanded ? ("1px solid " + c.border) : "1px solid transparent"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "0 4px 0 0", color: c.textQuad }}>
          <GripVertical size={14} strokeWidth={1.5} />
        </div>
        <div style={{ color: c.textTer, display: "flex", alignItems: "center", marginRight: 8 }}>
          {cat.expanded ? <ChevronDown size={15} strokeWidth={1.8} /> : <ChevronRight size={15} strokeWidth={1.8} />}
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: c.text, flex: 1 }}>{cat.name}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Badge variant="muted">
            {cat.stages.length} {cat.stages.length === 1 ? "stage" : "stages"}
          </Badge>
          {cat.dataSource && (
            <Badge variant="default">
              <Link size={10} strokeWidth={2} />
              {cat.dataSource}
            </Badge>
          )}
          <Toggle on={cat.enabled} onToggle={function() { onToggle(cat.id); }} />
        </div>
      </div>
      {cat.expanded && (
        <div style={{ background: c.bgEl, borderRadius: "0 0 " + rad.md + "px " + rad.md + "px", padding: "4px 0 8px" }}>
          {cat.stages.map(function(s) {
            return (
              <div
                key={s.id}
                style={{
                  display: "flex", alignItems: "center", gap: 0,
                  padding: "8px 12px 8px 16px", opacity: s.enabled ? 1 : 0.45
                }}
              >
                <div style={{ color: c.textQuad, display: "flex", alignItems: "center", padding: "0 6px 0 0" }}>
                  <GripVertical size={12} strokeWidth={1.5} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, color: c.text, fontWeight: 500 }}>{s.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                    <span style={{ fontSize: 11, color: c.textTer, display: "flex", alignItems: "center", gap: 3 }}>
                      <Clock size={11} strokeWidth={1.8} />
                      {s.sla} SLA
                    </span>
                    <span style={{ fontSize: 11, color: c.textQuad }}>·</span>
                    <span style={{ fontSize: 11, color: c.textTer }}>{s.role}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 4, padding: "2px 8px",
                    background: c.bgElActive, borderRadius: 4, border: "1px solid " + c.border
                  }}>
                    <MethodIcon method={s.method} />
                    <span style={{ fontSize: 11, color: c.textSec }}>{s.method}</span>
                  </div>
                  <Toggle on={s.enabled} onToggle={function() { onToggleStage(cat.id, s.id); }} size={16} />
                </div>
              </div>
            );
          })}
          <div style={{ padding: "8px 16px 4px 42px" }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 4, background: "transparent",
              border: "none", color: c.textTer, fontSize: 12, cursor: "pointer", padding: "4px 0"
            }}>
              <Plus size={13} strokeWidth={2} /> Add stage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WorkflowStructure() {
  var wfState = useState("product-request");
  var selWf = wfState[0]; var setSelWf = wfState[1];
  var tabState = useState("structure");
  var tab = tabState[0]; var setTab = tabState[1];
  var intState = useState(mkIntake);
  var intake = intState[0]; var setIntake = intState[1];
  var assState = useState(mkAssess);
  var assess = assState[0]; var setAssess = assState[1];

  function toggleIntakeEnabled(id) {
    setIntake(function(p) { return p.map(function(x) { return x.id === id ? Object.assign({}, x, { enabled: !x.enabled }) : x; }); });
  }
  function toggleIntakeExpand(id) {
    setIntake(function(p) { return p.map(function(x) { return x.id === id ? Object.assign({}, x, { expanded: !x.expanded }) : x; }); });
  }
  function toggleAssessEnabled(id) {
    setAssess(function(p) { return p.map(function(x) { return x.id === id ? Object.assign({}, x, { enabled: !x.enabled }) : x; }); });
  }
  function toggleAssessExpand(id) {
    setAssess(function(p) { return p.map(function(x) { return x.id === id ? Object.assign({}, x, { expanded: !x.expanded }) : x; }); });
  }
  function toggleStage(catId, stageId) {
    setAssess(function(p) {
      return p.map(function(x) {
        if (x.id !== catId) return x;
        return Object.assign({}, x, {
          stages: x.stages.map(function(s) {
            return s.id === stageId ? Object.assign({}, s, { enabled: !s.enabled }) : s;
          })
        });
      });
    });
  }

  var wf = WORKFLOWS.find(function(w) { return w.id === selWf; });
  var totalQ = intake.reduce(function(a, x) { return a + x.questions.length; }, 0);
  var totalS = assess.reduce(function(a, x) { return a + x.stages.length; }, 0);

  var tabs = [
    { id: "structure", label: "Structure", icon: Layers },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div style={{
      display: "flex", height: "100vh", background: c.bg, color: c.text,
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontSize: 13, overflow: "hidden"
    }}>
      {/* Left sidebar */}
      <div style={{ width: 230, borderRight: "1px solid " + c.border, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid " + c.border }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: c.textSec, letterSpacing: "0.02em" }}>Workflows</span>
            <Badge variant="muted">{WORKFLOWS.length}</Badge>
          </div>
        </div>
        <div style={{ flex: 1, padding: "6px 8px", overflowY: "auto" }}>
          {WORKFLOWS.map(function(w) {
            return (
              <div
                key={w.id}
                onClick={function() { setSelWf(w.id); }}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "8px 10px", borderRadius: rad.sm, cursor: "pointer",
                  background: selWf === w.id ? c.bgEl : "transparent",
                  transition: "background 0.1s", marginBottom: 1
                }}
              >
                <span style={{
                  fontSize: 13, color: selWf === w.id ? c.text : c.textSec,
                  fontWeight: selWf === w.id ? 500 : 400
                }}>
                  {w.name}
                </span>
                <Badge variant="count">{w.active}</Badge>
              </div>
            );
          })}
        </div>
      </div>

      {/* Centre */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Header */}
        <div style={{ padding: "16px 28px 0", borderBottom: "1px solid " + c.border }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <h1 style={{ fontSize: 18, fontWeight: 600, margin: 0, letterSpacing: "-0.02em" }}>
                  {wf.name}
                </h1>
                <Badge variant="accent">Active</Badge>
              </div>
              <p style={{ fontSize: 12, color: c.textTer, margin: 0 }}>
                Standard approval workflow for new EdTech product requests.
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button style={{
                display: "flex", alignItems: "center", gap: 6, background: "transparent",
                border: "1px solid " + c.border, color: c.textSec, padding: "7px 14px",
                borderRadius: rad.sm, fontSize: 12, fontWeight: 500, cursor: "pointer"
              }}>
                <Eye size={14} strokeWidth={1.8} /> Preview
              </button>
              <button style={{
                display: "flex", alignItems: "center", gap: 6, background: c.accent,
                border: "none", color: c.bg, padding: "7px 16px", borderRadius: rad.sm,
                fontSize: 12, fontWeight: 600, cursor: "pointer"
              }}>
                <Save size={14} strokeWidth={2} /> Save
              </button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            {tabs.map(function(t) {
              var TabIcon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={function() { setTab(t.id); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
                    background: "none", border: "none",
                    borderBottom: tab === t.id ? ("2px solid " + c.accent) : "2px solid transparent",
                    color: tab === t.id ? c.text : c.textTer,
                    fontSize: 12.5, fontWeight: 500, cursor: "pointer", marginBottom: -1
                  }}
                >
                  <TabIcon size={14} strokeWidth={1.8} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 28px 40px" }}>
          {tab === "structure" && (
            <div>
              <div style={{ display: "flex", gap: 16, padding: "16px 0 4px" }}>
                <span style={{ fontSize: 11, color: c.textTer }}>
                  {intake.length} intake categories · {totalQ} questions
                </span>
                <span style={{ fontSize: 11, color: c.textQuad }}>|</span>
                <span style={{ fontSize: 11, color: c.textTer }}>
                  {assess.length} assessment categories · {totalS} stages
                </span>
              </div>

              <PhaseHeader
                icon={FileText}
                label="Intake"
                description="Completed by requester"
                count={intake.length}
                onAdd={function() {}}
              />
              {intake.map(function(cat) {
                return (
                  <IntakeCategory
                    key={cat.id}
                    cat={cat}
                    onToggle={toggleIntakeEnabled}
                    onToggleExpand={toggleIntakeExpand}
                  />
                );
              })}

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0 4px" }}>
                <div style={{ flex: 1, height: 1, background: c.border }} />
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: c.textQuad }}>
                  <ChevronDown size={12} strokeWidth={2} />
                  <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Submitted to reviewers
                  </span>
                  <ChevronDown size={12} strokeWidth={2} />
                </div>
                <div style={{ flex: 1, height: 1, background: c.border }} />
              </div>

              <PhaseHeader
                icon={ClipboardCheck}
                label="Assessments"
                description="Completed by reviewers"
                count={assess.length}
                onAdd={function() {}}
              />
              {assess.map(function(cat) {
                return (
                  <AssessCategory
                    key={cat.id}
                    cat={cat}
                    onToggle={toggleAssessEnabled}
                    onToggleExpand={toggleAssessExpand}
                    onToggleStage={toggleStage}
                  />
                );
              })}
            </div>
          )}

          {tab === "analytics" && (
            <div style={{ padding: "40px 0", textAlign: "center" }}>
              <BarChart3 size={32} color={c.textQuad} strokeWidth={1.5} />
              <p style={{ color: c.textTer, fontSize: 13, marginTop: 12 }}>
                Analytics view — stage performance, bottlenecks, and completion data.
              </p>
              <p style={{ color: c.textQuad, fontSize: 12 }}>See previous prototype for this tab.</p>
            </div>
          )}

          {tab === "settings" && (
            <div style={{ padding: "40px 0", textAlign: "center" }}>
              <Settings size={32} color={c.textQuad} strokeWidth={1.5} />
              <p style={{ color: c.textTer, fontSize: 13, marginTop: 12 }}>
                Settings — workflow name, notifications, permissions.
              </p>
              <p style={{ color: c.textQuad, fontSize: 12 }}>See previous prototype for this tab.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right sidebar */}
      <div style={{ width: 250, borderLeft: "1px solid " + c.border, flexShrink: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px 16px 14px", borderBottom: "1px solid " + c.border }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkles size={14} color={c.accent} strokeWidth={2} />
            <span style={{ fontSize: 12, fontWeight: 600, color: c.text }}>Workflow Intelligence</span>
          </div>
          <p style={{ fontSize: 11, color: c.textTer, margin: "6px 0 0", lineHeight: 1.45 }}>
            AI-generated insights based on workflow performance data.
          </p>
        </div>
        <div style={{ padding: 16, flex: 1, overflowY: "auto" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 500, color: c.textSec, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
              <BarChart3 size={12} strokeWidth={1.8} /> This Quarter
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{ background: c.bgEl, borderRadius: rad.sm, padding: "10px 12px", border: "1px solid " + c.border }}>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>23</div>
                <div style={{ fontSize: 10, color: c.textTer, marginTop: 2 }}>Requests</div>
              </div>
              <div style={{ background: c.bgEl, borderRadius: rad.sm, padding: "10px 12px", border: "1px solid " + c.border }}>
                <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>12d</div>
                <div style={{ fontSize: 10, color: c.textTer, marginTop: 2 }}>Avg. Time</div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 500, color: c.textSec, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
              <AlertCircle size={12} strokeWidth={1.8} /> Bottlenecks
            </div>
            <div style={{
              background: c.redDim, border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: rad.sm, padding: 12, marginBottom: 8
            }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: c.red, marginBottom: 4 }}>Evidence Based stage</div>
              <div style={{ fontSize: 11, color: c.textSec, lineHeight: 1.5 }}>
                Averaging 8 days against a 5-day SLA. 3 requests currently overdue at this stage.
              </div>
            </div>
            <div style={{ background: c.bgEl, border: "1px solid " + c.border, borderRadius: rad.sm, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: c.textSec, marginBottom: 4 }}>Cost Review stalled</div>
              <div style={{ fontSize: 11, color: c.textTer, lineHeight: 1.5 }}>
                3 renewal requests are stalled at cost review. Finance team has 5 pending actions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
