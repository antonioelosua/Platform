"use client"

import { useState, useEffect } from "react";

// ─── TRANSLATION STRINGS ────────────────────────────────────────────────────
const T = {
  en: {
    appName:"Beecker Agents", catalogTab:"AI Agent Catalog", dashboardTab:"Dashboard", agentLabel:"Agent",
    catalogTitle:"AI Agent Catalog", dashboardTitle:"Dashboard",
    catalogSub:"24 production-ready agents automating end-to-end enterprise processes. Select a process area to explore agents and view full capability sheets.",
    dashboardSub:"Illustrative benchmark metrics, performance data, and a live look at deployed agents in action.",
    agents:"agents", home:"Home", backTo:"Back to", backToPlatform:"Back to Dashboard",
    capabilitySheet:"CAPABILITY SHEET", whatItDoes:"WHAT IT DOES", businessProblem:"BUSINESS PROBLEM SOLVED",
    idealUser:"IDEAL USER / OPERATOR", keyFeatures:"KEY FEATURES & CAPABILITIES",
    inputsRequired:"INPUTS REQUIRED", outputsDeliverables:"OUTPUTS & DELIVERABLES",
    maturityReadiness:"MATURITY & READINESS",
    limitations:"LIMITATIONS, DEPENDENCIES & IMPLEMENTATION REQUIREMENTS",
    productionReady:"Production-ready", transactionDetails:"Transaction details",
    processingTimeline:"Processing timeline", conversation:"Conversation",
    conversationSub:n=>`Between ${n} (AI agent) and the end user`,
    messagePlaceholder:n=>`Message ${n}...`, send:"Send",
    processOverview:"Process overview", processOverviewSub:"Current pipeline stage distribution",
    recentExceptions:"Recent exceptions", recentExceptionsSub:"Pending human review",
    runHistory:"Run history", runHistorySub:"Click any row to view process detail and conversation",
    pageOf:(a,b)=>`Page ${a} of ${b}`, prev:"Prev", next:"Next",
    active:"Active", viewDashboard:"View dashboard →",
    exceptionsPending:n=>`${n} exception${n!==1?"s":""} pending review`,
    executionStart:"Execution start", status:"Status", duration:"Duration",
    description:"Description", reference:"Reference", requests:"requests",
    cycleTimeTitle:"Cycle time: manual vs automated", cycleTimeSub:"Days to complete, by process",
    manual:"Manual", automated:"Automated",
    savingsTitle:"Estimated annual savings", savingsSub:"USD thousands, by process area",
    roiTitle:"Cumulative ROI over 12 months", roiSub:"Return multiplier from go-live",
    sampleAgentsLabel:"SAMPLE DEPLOYED AGENTS",
    sampleAgentsSub:"Click any agent to view their live monitoring dashboard.",
    clickForCapability:"Click any agent for their full capability sheet.",
    moreAgents: n => `+${n} more`,
    agentReply:ref=>`Thank you for your message. I've noted your input and will update the process accordingly. I'll notify you of any changes to the status of ${ref}.`,
    trigger:"Trigger",
    kpis:[
      {value:"78%",label:"Reduction in manual processing time",sub:"Across H2R, P2P, O2C"},
      {value:"$2.4M",label:"Est. annual savings per deployment",sub:"10,000+ transactions/month"},
      {value:"3.8x",label:"ROI within first 12 months",sub:"Combined H2R, P2P, O2C"},
      {value:"62%",label:"Lower cost-per-transaction",sub:"vs fully manual baseline"},
    ],
    chartLabels:{
      cycleItems:["Invoice","PO creation","Onboarding","Travel claim"],
      months:["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"],
    },
    areaDescs:{
      h2r:"End-to-end HR lifecycle automation from job opening planning through retirement processing.",
      p2p:"Full procurement lifecycle automation from demand planning through invoice processing and payment disbursement.",
      o2c:"Complete order fulfillment and receivables automation from order intake through accounts receivable management.",
    },
    areaFulls:{ h2r:"Hire-to-Retire", p2p:"Procure-to-Pay", o2c:"Order-to-Cash" },
    statusLabels:{ "In progress":"In progress","Successful":"Successful","Completed":"Completed","In review":"In review" },
    agentDetails:{
      Fer:{
        module:"Job Opening Planning", trigger:"New Job Opening Detected",
        what:"Detects job opening signals from workforce data, org changes, or attrition events and automatically initiates requisition workflows, routing them to the appropriate approvers with pre-populated job data.",
        problem:"Eliminates manual tracking of open positions and lag time between job opening identification and requisition creation, reducing time-to-hire initiation.",
        users:["HR business partners","Workforce planners","HR operations staff","CHCO office support"],
        capabilities:["Monitors workforce data streams for job opening signals","Auto-populates requisition with position classification data","Routes draft requisition to designated approvers","Logs trigger event with timestamp and source","Integrates with HRIS and position management systems"],
        inputs:["Workforce planning data","Org structure records","Attrition / separation notices","Position classification data","Approval routing rules"],
        outputs:["Initiated requisition record","Routing notification to approvers","Position data pre-fill","Audit log of trigger event"],
        maturity:"Production-ready. Repeatable deployment pattern for HRIS-integrated environments.",
        limits:["Requires clean position data to pre-populate accurately","Job opening signals depend on upstream HR system data quality","Does not make hiring decisions","Requires HRIS integration and approval routing configuration"],
      },
      Lucas:{
        module:"Recruitment", trigger:"New Application Received",
        what:"Processes incoming applications, screens candidates against defined criteria, organizes applicant data, and routes qualified candidates to human reviewers with structured summaries.",
        problem:"Reduces the burden of manual application screening in high-volume hiring, ensuring consistent criteria application and faster movement of qualified candidates to human decision-makers.",
        users:["HR specialists","Hiring managers","EEO officers","Talent acquisition teams"],
        capabilities:["Ingests and normalizes applications from multiple channels","Applies defined screening criteria consistently","Generates structured candidate summaries","Routes to human reviewers by position","Maintains EEO documentation and audit log"],
        inputs:["Job applications and resumes","Position requirements / KSAs","Screening criteria and rules","EEO data","Assessment results"],
        outputs:["Screened applicant list with scores","Structured candidate summaries","Routed review queue","EEO documentation package","Audit trail of screening logic"],
        maturity:"Production-ready. Deployed in high-volume hiring environments with configurable criteria per position.",
        limits:["Screening quality depends on clarity of defined criteria","Does not make hiring selections — advisory only","Requires human review for all qualification determinations","ATS integration required"],
      },
      Isa:{
        module:"Selection, Hiring & Onboarding", trigger:"New Employee Hire Detected",
        what:"Manages offer workflows, coordinates hiring documentation collection, and executes structured onboarding task sequences for new employees from offer acceptance through first-day readiness.",
        problem:"Eliminates dropped tasks and delays in the offer-to-onboard process, ensuring every new hire completes required steps on time and documentation is complete before day one.",
        users:["HR onboarding specialists","Security / FSO staff","IT provisioning teams","New hire supervisors"],
        capabilities:["Triggers onboarding task sequences on hire confirmation","Tracks documentation completion in real time","Initiates background check and clearance workflows","Sends automated reminders for incomplete items","Coordinates across HR, IT, and security stakeholders"],
        inputs:["Offer acceptance confirmation","New hire personal data","Required documentation checklist","Background check rules","IT provisioning requests","Onboarding task templates"],
        outputs:["Completed onboarding task tracker","Documentation completion status","Background check initiation record","IT access request","Day-one readiness confirmation","Audit log"],
        maturity:"Production-ready. Modular task framework adapts to agency-specific onboarding requirements.",
        limits:["Cannot adjudicate clearances or make suitability determinations","Dependent on new hire responsiveness for document submission","IT provisioning timelines depend on external system capacity","Requires HRIS, background check system, and IT service desk integration"],
      },
      Ben:{
        module:"Performance & Development", trigger:"Performance Review Scheduled",
        what:"Schedules and orchestrates performance review cycles, collects self-assessments and manager inputs, flags overdue reviews, and consolidates data for HR reporting.",
        problem:"Prevents compliance failures from missed review deadlines and reduces administrative burden on managers and HR staff managing large-scale evaluation cycles.",
        users:["HR specialists","Supervisors and managers","CHCO office staff","L&D teams"],
        capabilities:["Schedules review cycles and sends participant notifications","Collects self-assessments and manager inputs via structured forms","Tracks completion status across the organization","Flags overdue reviews for HR escalation","Consolidates appraisal data for reporting"],
        inputs:["Employee roster and review schedules","Performance plan templates","Self-assessment forms","Manager review inputs","Training and development records"],
        outputs:["Review cycle status dashboard","Completed appraisal packages","Overdue review alerts","Consolidated performance data","IDP tracking report","Audit log"],
        maturity:"Production-ready. Configurable for annual, mid-year, and probationary review cycles.",
        limits:["Does not assign or recommend performance ratings","Quality depends on supervisor participation and timely input","Cannot substitute for manager judgment in evaluation","Requires performance management platform integration"],
      },
      Lily:{
        module:"Compensation & Benefits", trigger:"Payroll Period Initiated",
        what:"Triggers payroll period processing, validates compensation data against HR records and policy rules, flags anomalies and discrepancies for review before payroll execution.",
        problem:"Reduces payroll errors caused by stale or inconsistent data, ensures benefits elections are accurately reflected, and gives HR and finance staff actionable exception reports before disbursement.",
        users:["Payroll specialists","Benefits administrators","HR operations staff","Finance / budget analysts"],
        capabilities:["Triggers validation workflows at payroll cycle start","Compares compensation data to HR records and policy rules","Validates benefits elections against enrollment data","Flags anomalies and routes to reviewer","Generates pre-disbursement exception report"],
        inputs:["Payroll period schedule","Employee compensation records","Benefits elections data","Leave balances","Personnel action records","Payroll business rules"],
        outputs:["Pre-payroll validation report","Exception and anomaly list","Benefits reconciliation summary","Leave balance confirmation","Routed exceptions for approval","Audit log"],
        maturity:"Production-ready. Supports bi-weekly, semi-monthly, and monthly payroll cycles.",
        limits:["Validation quality depends on timeliness of upstream HR data","Does not execute payroll — supports pre-processing validation only","Cannot adjudicate complex compensation disputes","Requires payroll system, HRIS, and leave management integration"],
      },
      Lisa:{
        module:"Travel & Expense", trigger:"Travel Reimbursement Request",
        what:"Processes travel reimbursement requests by extracting claim data, validating against per diem rules and travel policy, identifying exceptions, and routing compliant requests for approval.",
        problem:"Eliminates manual policy lookup and calculation for travel claims, reduces processing time, catches policy violations before payment, and creates a complete audit record for each claim.",
        users:["Travelers / claimants","Travel administrators","Finance operations staff","Approving officials"],
        capabilities:["Extracts claim data from submitted forms and receipts","Validates against applicable per diem and travel policy rules","Calculates allowable vs. claimed amounts","Flags policy exceptions with specific rule citations","Routes compliant requests for approval"],
        inputs:["Travel reimbursement requests","Receipts and supporting documentation","Per diem rates and FTR/JTR rules","Trip authorization records","Approval routing rules"],
        outputs:["Validated reimbursement request","Policy compliance summary","Exception flags with detail","Routed approval package","Audit log"],
        maturity:"Production-ready. Configurable for FTR, JTR, and agency-specific travel policies.",
        limits:["Per diem rate accuracy depends on rule table maintenance","Unusual circumstances require human judgment","Receipt quality affects data extraction accuracy","Travel management system integration required"],
      },
      Cleo:{
        module:"Separation & Retirement", trigger:"Retirement Notification",
        what:"Manages offboarding and retirement processing workflows triggered by separation notifications, coordinating tasks across HR, IT, security, finance, and benefits to ensure complete and compliant offboarding.",
        problem:"Prevents gaps in offboarding that create security, financial, or compliance risks by orchestrating all steps from a single trigger.",
        users:["HR specialists","Security / FSO staff","IT administrators","Payroll and benefits teams","Supervisors"],
        capabilities:["Triggers multi-stakeholder offboarding task sequences","Coordinates clearance revocation and IT access termination","Calculates final pay, leave payouts, and benefits continuation","Tracks task completion across departments","Generates retirement documentation packages"],
        inputs:["Separation or retirement notice","Employee record and service history","Final leave balance data","Benefits continuation elections","IT asset inventory","Clearance and access records"],
        outputs:["Offboarding task completion tracker","Final pay calculation package","Clearance revocation request","IT access termination confirmation","Benefits transition documentation","Audit log"],
        maturity:"Production-ready. Handles voluntary separation, retirement, and RIF offboarding scenarios.",
        limits:["Retirement benefit calculations require current OPM rule accuracy","Clearance revocation timelines depend on security office capacity","Complex cases require specialist handling","Requires HRIS, IT provisioning, and security clearance system integration"],
      },
      Alice:{
        module:"Demand Planning", trigger:"Demand Signal Detected",
        what:"Analyzes demand signals from program data, consumption history, and operational inputs to initiate procurement planning workflows and generate preliminary requirements documentation.",
        problem:"Reduces lag between mission need identification and procurement initiation, improving lead time management and reducing emergency or sole-source procurement situations.",
        users:["Contracting officers / CORs","Program managers","Logistics and supply chain staff","Budget analysts"],
        capabilities:["Aggregates demand signals from multiple program data sources","Generates preliminary requirements documentation","Aligns demand forecasts with fiscal year budget data","Initiates procurement planning workflows","Flags supply risk based on lead time and inventory data"],
        inputs:["Program demand data","Historical consumption records","Budget and fiscal year data","Inventory levels","Program schedule data"],
        outputs:["Demand forecast summary","Initiated procurement planning record","Requirements draft","Budget alignment report","Audit log"],
        maturity:"Production-ready. Supports annual acquisition planning and ongoing demand monitoring cycles.",
        limits:["Forecast accuracy depends on data quality and historical record completeness","Cannot account for unplanned mission changes without updated inputs","Requires program management system and budget system integration"],
      },
      Jessica:{
        module:"Supplier Selection", trigger:"Vendor Need Identified",
        what:"Evaluates and scores supplier candidates against defined criteria including past performance, pricing, compliance status, and capability data, producing structured comparison summaries for human decision-makers.",
        problem:"Replaces time-consuming manual vendor research and scoring with consistent, documented evaluation that supports defensible source selection decisions.",
        users:["Contracting officers","Source selection officials","Small business specialists","Program managers"],
        capabilities:["Queries SAM.gov and debarment lists for compliance status","Scores suppliers against defined evaluation criteria","Flags small business categories and set-aside eligibility","Generates structured comparison summaries","Maintains evaluation audit trail"],
        inputs:["Supplier capability data","SAM.gov / EPLS registration status","Past performance records","Pricing data","Small business classification data","Evaluation criteria"],
        outputs:["Scored supplier comparison matrix","Compliance status summary","Small business eligibility flags","Source selection support package","Audit log"],
        maturity:"Production-ready. Criteria framework configurable per acquisition type and set-aside category.",
        limits:["Cannot make final source selection determinations — advisory only","Data quality depends on supplier registration accuracy","Complex procurements require additional technical evaluation","SAM.gov API access required"],
      },
      Elsa:{
        module:"Supplier Onboarding", trigger:"New Supplier Approved",
        what:"Automates supplier registration workflows including documentation collection, data validation, SAM.gov alignment checks, and vendor master data setup in financial systems.",
        problem:"Eliminates manual data entry and back-and-forth with suppliers during registration, reducing onboarding time and ensuring master data accuracy before the first transaction.",
        users:["Contracting officers","AP / finance staff","Procurement administrators","Vendor management teams"],
        capabilities:["Collects and validates supplier documentation","Verifies SAM.gov registration and expiration status","Validates banking and payment routing data","Creates vendor master record in financial system","Routes incomplete submissions back to supplier"],
        inputs:["Supplier registration request","Business documentation (TIN, banking)","SAM.gov registration data","Vendor classification data","Approval routing rules"],
        outputs:["Validated vendor master record","SAM.gov compliance confirmation","Banking data verification summary","Onboarding completion notification","Audit log"],
        maturity:"Production-ready. Supports new vendor setup and annual SAM.gov re-registration validation.",
        limits:["Cannot verify ownership or beneficial interest beyond submitted documentation","SAM.gov data accuracy depends on supplier registration maintenance","Requires financial system vendor master access and SAM.gov API integration"],
      },
      Olivia:{
        module:"PO Creation", trigger:"Requisition Approved",
        what:"Generates purchase orders from approved requisitions, applies validation checks for funding availability, contract linkage, and data completeness, and routes for final approval before issuance.",
        problem:"Eliminates manual PO drafting, reduces data entry errors, and ensures every PO is properly funded, linked to a contract or authority, and approved before commitment.",
        users:["Contracting officers","Purchasing agents","Budget analysts","Program managers"],
        capabilities:["Generates PO from approved requisition data","Checks funds availability against budget system","Validates contract linkage and authority","Routes for approval based on dollar threshold","Records obligation upon approval"],
        inputs:["Approved requisition","Budget / funds availability data","Contract or BPA reference","Item/service specifications","Vendor master data","Approval thresholds"],
        outputs:["Draft PO with validation results","Funds availability confirmation","Approved PO ready for issuance","Obligation record","Audit log"],
        maturity:"Production-ready. Configurable for simplified acquisition and contract-based purchasing workflows.",
        limits:["Cannot create contracts or acquisition instruments","Funds availability check depends on real-time budget system data","Complex modifications require manual contracting action","Requires ERP/financial management system and budget system integration"],
      },
      Chris:{
        module:"Goods Receipt", trigger:"Delivery Received",
        what:"Records and validates goods and services receipts against purchase order data, identifies discrepancies in quantity, condition, or specifications, and routes exceptions for authorized acceptance.",
        problem:"Eliminates manual receiving log entries, ensures receipt documentation is complete before invoice processing begins, and creates a reliable record for 3-way match execution.",
        users:["Receiving / warehouse staff","CORs / COTRs","Property managers","AP teams"],
        capabilities:["Records receipt against PO line items","Validates quantity and specification matches","Flags shortages, overages, or damaged goods","Generates structured receiving report","Updates property accountability records"],
        inputs:["Delivery documentation / packing list","Purchase order data","Inspection criteria","Property accountability rules","Acceptance authority designation"],
        outputs:["Validated receiving report","Discrepancy flags with detail","Property record update","Acceptance confirmation","3-way match input record","Audit log"],
        maturity:"Production-ready. Supports full and partial delivery scenarios with configurable acceptance rules.",
        limits:["Cannot perform physical inspection — supports documentation only","Condition assessment requires human inspector","Partial delivery handling requires defined business rules","Requires PO system and property management system integration"],
      },
      Tony:{
        module:"Inventory Management", trigger:"Inventory Update Detected",
        what:"Monitors inventory levels across locations, flags reorder points and stock-outs, reconciles discrepancies between physical counts and system records, and generates inventory status reports.",
        problem:"Prevents stockouts and excess inventory through proactive monitoring, reduces manual reconciliation labor, and maintains accurate property records required for audit.",
        users:["Supply chain / logistics staff","Property managers","Procurement teams","Finance / budget analysts"],
        capabilities:["Monitors stock levels against defined reorder thresholds","Reconciles system records with physical count data","Flags discrepancies and routes for investigation","Identifies excess and obsolete inventory","Generates audit-ready inventory reports"],
        inputs:["Inventory system data","Physical count records","Reorder point rules","Property accountability data","Consumption history"],
        outputs:["Inventory status report","Reorder recommendations","Discrepancy flags","Reconciliation summary","Excess property identification","Audit log"],
        maturity:"Production-ready. Supports multi-location inventory with configurable reorder and accountability rules.",
        limits:["Accuracy depends on real-time system data and physical count frequency","Cannot independently verify physical inventory","Disposal recommendations require human and regulatory review","Requires inventory management and property management system integration"],
      },
      Ryan:{
        module:"Returns Management", trigger:"Return Request Initiated",
        what:"Processes vendor return requests by documenting the return reason, coordinating with suppliers, initiating credit or replacement workflows, and updating inventory and financial records.",
        problem:"Replaces manual return coordination with a structured, documented process that ensures credits are received, inventory is accurately updated, and the supplier is held accountable.",
        users:["Receiving / supply staff","Contracting officers","AP teams","Property managers"],
        capabilities:["Initiates return authorization workflow","Notifies supplier with structured return documentation","Tracks credit or replacement receipt","Updates inventory records upon return confirmation","Maintains return audit trail"],
        inputs:["Return request with reason code","Original PO and receipt data","Vendor contact and return instructions","Inventory records","Credit/replacement rules"],
        outputs:["Return authorization record","Vendor return notification","Credit or replacement request","Updated inventory record","Audit log"],
        maturity:"Production-ready. Handles defective goods, over-delivery, and warranty return scenarios.",
        limits:["Supplier responsiveness affects process cycle time","Complex warranty or dispute cases require contracting officer involvement","Requires inventory system access and supplier communication integration"],
      },
      Daniel:{
        module:"Invoice Processing & 3-Way Match", trigger:"Invoice Received",
        what:"Automates the review of supplier invoices against purchase orders, receiving records, and business rules to identify matches, discrepancies, and exceptions requiring human review.",
        problem:"Reduces manual effort in invoice review, improves accuracy, speeds processing cycles, and allows AP staff to focus on exception handling rather than repetitive verification of routine transactions.",
        users:["AP teams","Procurement analysts","Finance operations staff","Shared services personnel"],
        capabilities:["Extracts and normalizes data from invoices and supporting documents","Compares invoice details to PO and receipt records at line-item level","Flags quantity, pricing, or documentation mismatches","Routes exceptions to designated reviewers","Creates audit-ready processing summaries"],
        inputs:["Supplier invoices","Purchase orders","Goods receipt records","Vendor master data","Approval rules and tolerance thresholds","ERP data"],
        outputs:["3-way match result","Discrepancy report","Exception queue","Approval recommendation","Audit log"],
        maturity:"Production-ready. Repeatable deployment pattern for document-driven finance workflows.",
        limits:["Performance depends on document quality and OCR readability","Requires complete PO and receipt records to execute match","Final approval authority remains with authorized personnel","Requires ERP integration and defined matching rules and thresholds"],
      },
      David:{
        module:"Payment Processing", trigger:"Invoice Approved for Payment",
        what:"Validates approved invoices for payment readiness, applies final pre-payment checks, and routes payment packages to the appropriate disbursement channel or Treasury system.",
        problem:"Reduces payment errors and delays by ensuring all required approvals and documentation are complete before disbursement initiation, and creates a clean handoff to payment execution.",
        users:["AP / disbursement staff","Finance operations teams","Budget analysts","Shared services personnel"],
        capabilities:["Validates approved invoice package completeness","Confirms vendor banking data accuracy","Applies pre-payment business rule checks","Routes to appropriate payment channel (EFT, check, IPAC)","Records disbursement data for financial reporting"],
        inputs:["Approved invoice package","Vendor banking / payment data","Funds certification","Payment method rules","Treasury / IPAC routing data"],
        outputs:["Payment-ready package","Pre-payment validation results","Payment routing confirmation","Disbursement record","Audit log"],
        maturity:"Production-ready. Supports EFT, check, and IPAC payment channels with configurable routing rules.",
        limits:["Does not execute payment independently — prepares and routes only","Dependent on approved invoice package completeness","IPAC and Treasury system integration requires agency-specific configuration"],
      },
      Nico:{
        module:"Order Processing", trigger:"New Order Received",
        what:"Ingests and validates incoming orders from internal or external customers, applies business rules for completeness and authorization, and initiates fulfillment workflows.",
        problem:"Eliminates manual order intake and routing, reduces order errors at the point of entry, and accelerates time from order receipt to fulfillment initiation.",
        users:["Order management staff","Supply chain coordinators","Program managers","Customer service teams"],
        capabilities:["Ingests orders from multiple channels (EDI, portal, manual)","Validates against authorization, catalog, and inventory data","Routes exceptions for human review","Initiates fulfillment workflow on validation","Sends order acknowledgment to customer"],
        inputs:["Incoming order data","Customer / agency authorization data","Product or service catalog","Inventory availability data","Routing rules"],
        outputs:["Validated order record","Fulfillment initiation trigger","Order acknowledgment","Exception flags for incomplete orders","Audit log"],
        maturity:"Production-ready. Supports multi-channel order intake with configurable validation rules.",
        limits:["Validation quality depends on data completeness at submission","Unusual order types may require manual handling","Requires order management system and inventory system integration"],
      },
      Diana:{
        module:"Delivery Planning", trigger:"Order Validated",
        what:"Plans and schedules delivery logistics based on validated order data, inventory availability, and customer delivery requirements, generating optimized delivery schedules.",
        problem:"Replaces manual delivery planning with an automated, data-driven scheduling process that reduces delays and improves on-time delivery performance.",
        users:["Logistics coordinators","Supply chain planners","Warehouse managers","Program managers"],
        capabilities:["Generates delivery schedules based on order and inventory data","Allocates warehouse resources to order fulfillment","Flags SLA risk based on current capacity","Recommends carrier assignments","Updates delivery plan as conditions change"],
        inputs:["Validated order data","Inventory and warehouse data","Customer delivery requirements","SLA / delivery commitment rules","Carrier capacity data"],
        outputs:["Delivery schedule","Resource and capacity plan","SLA compliance forecast","Carrier assignment recommendations","Audit log"],
        maturity:"Production-ready. Configurable for single and multi-location fulfillment environments.",
        limits:["Planning accuracy depends on real-time inventory and carrier data","Unforeseen disruptions require human re-planning","Requires order management, warehouse management, and carrier data integration"],
      },
      James:{
        module:"Transportation Planning", trigger:"Delivery Scheduled",
        what:"Optimizes routing and carrier selection for outbound shipments based on delivery requirements, cost parameters, compliance rules, and carrier availability.",
        problem:"Replaces manual carrier selection and routing with automated optimization that reduces shipping costs, improves delivery reliability, and ensures carrier compliance documentation.",
        users:["Transportation coordinators","Logistics managers","Contracting officers","Supply chain staff"],
        capabilities:["Evaluates carrier options against cost, compliance, and capacity criteria","Generates optimized routing recommendations","Documents carrier compliance (small business, AbilityOne, etc.)","Creates shipment instruction packages","Tracks carrier selection rationale for audit"],
        inputs:["Delivery schedule data","Carrier database and rates","Routing optimization rules","Compliance requirements (carrier type, set-aside)","Shipment specifications"],
        outputs:["Optimized routing plan","Carrier selection recommendation","Compliance documentation","Shipment instruction package","Audit log"],
        maturity:"Production-ready. Supports multi-carrier environments with configurable compliance rule sets.",
        limits:["Routing optimization depends on carrier data currency","Sensitive or classified shipments require additional security protocols beyond agent scope","Requires carrier database and routing engine integration"],
      },
      Julia:{
        module:"Outbound Logistics", trigger:"Shipment Ready for Dispatch",
        what:"Manages outbound shipment execution including shipping document generation, carrier handoff coordination, tracking initiation, and delivery confirmation processing.",
        problem:"Eliminates manual shipping document preparation and handoff coordination, ensures all required documentation accompanies shipments, and creates a real-time tracking record.",
        users:["Warehouse / shipping staff","Logistics coordinators","Property managers","Program managers"],
        capabilities:["Generates bills of lading and shipping documentation","Coordinates carrier pickup and handoff","Initiates shipment tracking","Processes delivery confirmation upon receipt","Flags shipment exceptions and delays"],
        inputs:["Approved shipment plan","Packing list and item data","Carrier instructions","Regulatory shipping requirements","Customer delivery confirmation rules"],
        outputs:["Shipping documentation package","Carrier handoff confirmation","Tracking number and shipment record","Delivery confirmation","Audit log"],
        maturity:"Production-ready. Supports standard and regulated shipment types with carrier API integration.",
        limits:["Cannot replace physical inspection or packing processes","Hazmat and classified item handling requires specialist oversight","Carrier API availability affects real-time tracking","Requires warehouse management and carrier API connectivity"],
      },
      Mia:{
        module:"Credit Management", trigger:"High-Risk Transaction Detected",
        what:"Evaluates credit exposure and financial risk for transactions and customer accounts, flags high-risk situations for human review, and generates credit status summaries.",
        problem:"Provides proactive risk visibility on AR balances and transaction exposure, reducing the likelihood of uncollectible receivables and supporting informed credit decisions.",
        users:["Accounts receivable staff","Finance managers","Program managers","Budget analysts"],
        capabilities:["Evaluates account-level credit exposure against defined limits","Flags transactions that exceed risk thresholds","Generates credit status summaries by customer/agency","Tracks payment history trends","Routes high-risk flags for human review"],
        inputs:["Customer / agency account data","Transaction history","Outstanding AR balances","Credit limit rules","Payment history data"],
        outputs:["Credit risk assessment","High-risk transaction flags","Account status summary","Credit limit utilization report","Audit log"],
        maturity:"Production-ready. Configurable credit limit rules by account type and transaction category.",
        limits:["Risk assessment based on available financial data only","Cannot account for off-system obligations or unrecorded liabilities","Requires AR system integration and credit limit rule configuration"],
      },
      Nina:{
        module:"Accounts Receivable", trigger:"Invoice Issued",
        what:"Manages accounts receivable workflows by applying incoming payments to open invoices, flagging overdue accounts, generating aging reports, and initiating collections follow-up.",
        problem:"Reduces days sales outstanding and uncollectible balances by automating payment application, proactively identifying overdue accounts, and ensuring collections actions are taken consistently.",
        users:["Accounts receivable staff","Finance managers","Budget analysts","Collections officers"],
        capabilities:["Applies incoming payments to open invoice records","Generates AR aging reports by account and period","Flags overdue accounts and initiates collections follow-up","Reconciles inter-agency billing discrepancies","Produces data for financial statement reporting"],
        inputs:["Issued invoices / billing records","Incoming payment data","Aging rules and collection thresholds","Customer / agency account data","Debt collection rules"],
        outputs:["Payment application records","AR aging report","Overdue account alerts","Collections action initiation","Financial reporting data","Audit log"],
        maturity:"Production-ready. Supports standard and inter-agency AR workflows with configurable aging and collections rules.",
        limits:["Payment application accuracy depends on invoice and remittance data matching","Debt collection escalation beyond automated follow-up requires human and legal involvement","Requires financial management / AR system and payment receipt data feed integration"],
      },
    },
    exceptions:{
      Daniel:[
        {type:"Price mismatch on line item 3",ref:"INV-2025-1038",severity:"high"},
        {type:"Missing PO reference",ref:"INV-2025-1035",severity:"medium"},
        {type:"Duplicate invoice detected",ref:"INV-2025-1031",severity:"medium"},
        {type:"Quantity discrepancy — over-delivery",ref:"INV-2025-1027",severity:"high"},
        {type:"Vendor banking data mismatch",ref:"INV-2025-1022",severity:"high"},
        {type:"Invoice amount exceeds BPA ceiling",ref:"INV-2025-1018",severity:"medium"},
      ],
      Isa:[
        {type:"Missing I-9 documentation",ref:"OB-2025-0094",severity:"high"},
        {type:"Background check delayed >10 days",ref:"OB-2025-0089",severity:"high"},
        {type:"IT provisioning request stalled",ref:"OB-2025-0087",severity:"medium"},
        {type:"Benefits enrollment not completed",ref:"OB-2025-0085",severity:"medium"},
        {type:"Emergency contact form missing",ref:"OB-2025-0083",severity:"medium"},
        {type:"Start date conflict with security clearance",ref:"OB-2025-0080",severity:"high"},
      ],
      Nina:[
        {type:"Payment applied to wrong invoice",ref:"AR-2025-0315",severity:"high"},
        {type:"Remittance advice missing",ref:"AR-2025-0310",severity:"medium"},
        {type:"Inter-agency billing dispute",ref:"AR-2025-0307",severity:"high"},
        {type:"DSO exceeded 45-day threshold",ref:"AR-2025-0299",severity:"high"},
        {type:"Partial payment not reconciled",ref:"AR-2025-0295",severity:"medium"},
        {type:"Duplicate payment detected",ref:"AR-2025-0288",severity:"high"},
      ],
    },
    runData:{
      Daniel:{
        runs:[
          {date:"Aug 05, 2025 · 11:41 AM",status:"In progress",duration:"1m 26s",desc:"Invoice validation batch",ref:"INV-2025-1042",stages:["Invoice received","Data extraction","2-way match","Record update"],stageStatus:[true,true,false,false],details:[{label:"Invoice number",val:"INV-2025-1042"},{label:"Vendor",val:"DHL Express Mexico"},{label:"Amount",val:"$4,320.00"},{label:"PO reference",val:"PO-0842"},{label:"Department",val:"Logistics"},{label:"Payment method",val:"EFT"}],chat:[{from:"agent",name:"Daniel",time:"11:41 AM",msg:"Hello, I've received invoice INV-2025-1042 from DHL Express Mexico for $4,320.00. I'm currently running a 3-way match against PO-0842. I'll notify you if any discrepancies are found."},{from:"user",name:"Carlos Aguilar",time:"11:43 AM",msg:"Thanks Daniel, please flag anything over a 2% variance on the line items."},{from:"agent",name:"Daniel",time:"11:43 AM",msg:"Understood. I've updated my matching tolerance to flag variances above 2%. Continuing the validation now."},{from:"user",name:"Carlos Aguilar",time:"11:50 AM",msg:"Any updates? We need this cleared before end of day."},{from:"agent",name:"Daniel",time:"11:50 AM",msg:"Currently at the 2-way match stage. Line items 1–6 matched successfully. Item 7 shows a $48 variance — within the 2% threshold. Estimated completion in 3 minutes."}]},
          {date:"Jul 22, 2025 · 03:15 PM",status:"Successful",duration:"1m 26s",desc:"3-way match processing batch",ref:"INV-2025-1041",stages:["Invoice received","Data extraction","2-way match","Record update"],stageStatus:[true,true,true,true],details:[{label:"Invoice number",val:"INV-2025-1041"},{label:"Vendor",val:"Francisco Javier Olvera"},{label:"Amount",val:"$1,850.00"},{label:"PO reference",val:"PO-0839"},{label:"Department",val:"Transport"},{label:"Payment method",val:"Corporate Credit Card"}],chat:[{from:"agent",name:"Daniel",time:"03:15 PM",msg:"Invoice INV-2025-1041 from Francisco Javier Olvera received. Starting validation against PO-0839."},{from:"user",name:"Ana Torres",time:"03:17 PM",msg:"This vendor has had issues before — please double check the receipt documentation."},{from:"agent",name:"Daniel",time:"03:17 PM",msg:"Confirmed. I'm cross-referencing against the goods receipt records from Jul 20. All quantities and prices matched. Invoice has been approved and routed for payment."},{from:"user",name:"Ana Torres",time:"03:20 PM",msg:"Great, thank you. Please send the audit summary to finance."},{from:"agent",name:"Daniel",time:"03:20 PM",msg:"Audit summary generated and sent to finance@company.com. Record updated successfully."}]},
          {date:"Jun 10, 2025 · 08:32 AM",status:"In review",duration:"1m 26s",desc:"PO reconciliation batch",ref:"INV-2025-1040",stages:["Invoice received","Data extraction","2-way match","Record update"],stageStatus:[true,false,false,false],details:[{label:"Invoice number",val:"INV-2025-1040"},{label:"Vendor",val:"Alezo Logistics"},{label:"Amount",val:"$9,100.00"},{label:"PO reference",val:"Missing"},{label:"Department",val:"Operations"},{label:"Payment method",val:"EFT"}],chat:[{from:"agent",name:"Daniel",time:"08:32 AM",msg:"Invoice INV-2025-1040 received from Alezo Logistics for $9,100.00. I was unable to locate a matching PO reference in the document. This has been flagged for human review."},{from:"user",name:"Carlos Aguilar",time:"08:35 AM",msg:"Can you check if there's a blanket PO for Alezo on file?"},{from:"agent",name:"Daniel",time:"08:35 AM",msg:"I searched the PO database for active blanket agreements with Alezo Logistics. Found BPA-0012 covering logistics services up to $8,000. The invoice amount of $9,100 exceeds the BPA ceiling — this requires a contracting officer review."},{from:"user",name:"Carlos Aguilar",time:"08:40 AM",msg:"Okay, I'll escalate to the CO. Hold the invoice pending approval."},{from:"agent",name:"Daniel",time:"08:40 AM",msg:"Invoice placed on hold. I've created an exception ticket #EXC-2025-088 and notified the contracting officer. I'll update you when a decision is made."}]},
        ]
      },
      Isa:{
        runs:[
          {date:"Aug 12, 2025 · 09:00 AM",status:"In progress",duration:"3d 4h",desc:"New hire onboarding — Sarah Mitchell",ref:"OB-2025-0091",stages:["Offer accepted","Documentation","Background check","IT provisioning"],stageStatus:[true,true,false,false],details:[{label:"Onboarding ID",val:"OB-2025-0091"},{label:"New hire",val:"Sarah Mitchell"},{label:"Position",val:"Program Analyst GS-11"},{label:"Start date",val:"Sep 01, 2025"},{label:"Department",val:"IT Operations"},{label:"Security level",val:"Public Trust"}],chat:[{from:"agent",name:"Isa",time:"09:00 AM",msg:"Welcome Sarah! I'm Isa, your onboarding assistant. I've received your offer acceptance — congratulations on joining the team. I'll be guiding you through the next steps."},{from:"user",name:"Sarah Mitchell",time:"09:05 AM",msg:"Thank you! What do I need to do first?"},{from:"agent",name:"Isa",time:"09:05 AM",msg:"I've sent a documentation checklist to your personal email. You'll need to complete your I-9, emergency contact form, and benefits enrollment within 3 business days."},{from:"user",name:"Sarah Mitchell",time:"09:20 AM",msg:"I submitted everything. How long does the background check take?"},{from:"agent",name:"Isa",time:"09:20 AM",msg:"Public Trust clearances typically take 5–7 business days. I'll send you an update as soon as it clears."}]},
          {date:"Jul 28, 2025 · 10:15 AM",status:"Completed",duration:"4d 2h",desc:"New hire onboarding — Marcus Lee",ref:"OB-2025-0088",stages:["Offer accepted","Documentation","Background check","IT provisioning"],stageStatus:[true,true,true,true],details:[{label:"Onboarding ID",val:"OB-2025-0088"},{label:"New hire",val:"Marcus Lee"},{label:"Position",val:"Senior Analyst GS-13"},{label:"Start date",val:"Aug 04, 2025"},{label:"Department",val:"Finance"},{label:"Security level",val:"Secret"}],chat:[{from:"agent",name:"Isa",time:"10:15 AM",msg:"Hi Marcus, I'm Isa. Your offer is confirmed. I've pre-filled your SF-86 — please review and sign within 48 hours."},{from:"user",name:"Marcus Lee",time:"10:30 AM",msg:"Done. What's next?"},{from:"agent",name:"Isa",time:"10:30 AM",msg:"Background check submitted. IT security team notified for Secret-level provisioning. Estimated clearance: 10 business days."},{from:"user",name:"Marcus Lee",time:"Aug 03 · 2:00 PM",msg:"Am I all set for tomorrow?"},{from:"agent",name:"Isa",time:"Aug 03 · 2:05 PM",msg:"Yes! Clearance passed. Laptop ships by 9 AM. Credentials sent to your work email. Welcome aboard!"}]},
          {date:"Jul 10, 2025 · 02:00 PM",status:"In review",duration:"1d 6h",desc:"New hire onboarding — Diana Reyes",ref:"OB-2025-0081",stages:["Offer accepted","Documentation","Background check","IT provisioning"],stageStatus:[true,false,false,false],details:[{label:"Onboarding ID",val:"OB-2025-0081"},{label:"New hire",val:"Diana Reyes"},{label:"Position",val:"Analyst GS-9"},{label:"Start date",val:"Aug 01, 2025"},{label:"Department",val:"HR"},{label:"Security level",val:"Public Trust"}],chat:[{from:"agent",name:"Isa",time:"02:00 PM",msg:"Hi Diana, congratulations! I've sent your documentation package — please complete all forms within 2 business days."},{from:"user",name:"Diana Reyes",time:"Jul 11 · 9:00 AM",msg:"I have a foreign passport and work visa for my I-9. Is that acceptable?"},{from:"agent",name:"Isa",time:"Jul 11 · 9:02 AM",msg:"Yes, a valid foreign passport + I-94 arrival record is an acceptable List A document. Please upload both in the portal."},{from:"user",name:"Diana Reyes",time:"Jul 11 · 11:00 AM",msg:"Uploaded both. Anything else?"},{from:"agent",name:"Isa",time:"Jul 11 · 11:01 AM",msg:"HR is reviewing your I-9 now. Once cleared, I'll advance you to the background check stage. I'll notify you within 24 hours."}]},
        ]
      },
      Nina:{
        runs:[
          {date:"Aug 10, 2025 · 08:00 AM",status:"In progress",duration:"2d 3h",desc:"AR aging review — Q3 collections",ref:"AR-2025-0312",stages:["Invoice issued","Payment matching","Aging review","Collections"],stageStatus:[true,true,true,false],details:[{label:"AR batch",val:"AR-2025-0312"},{label:"Period",val:"Q3 2025"},{label:"Open balance",val:"$184,500"},{label:"Accounts reviewed",val:"42"},{label:"Overdue accounts",val:"3"},{label:"DSO",val:"18 days"}],chat:[{from:"agent",name:"Nina",time:"08:00 AM",msg:"Good morning. Q3 AR aging review complete. Three accounts are overdue: Meridian Group ($42,000, 45 days), Apex Solutions ($18,200, 32 days), and Coastal Partners ($9,100, 28 days). Initiating collections follow-up."},{from:"user",name:"Ana Torres",time:"08:15 AM",msg:"Meridian is a recurring issue. Escalate to legal."},{from:"agent",name:"Nina",time:"08:15 AM",msg:"Escalating Meridian Group to legal collections. Debt summary prepared and sent to legal@company.com."},{from:"user",name:"Ana Torres",time:"08:20 AM",msg:"For Apex and Coastal, send a standard past-due notice first."},{from:"agent",name:"Nina",time:"08:20 AM",msg:"Past-due notices sent to Apex and Coastal with 10-day response windows. Auto-escalation set for Aug 20."}]},
          {date:"Jul 31, 2025 · 05:00 PM",status:"Successful",duration:"45m",desc:"Monthly payment application",ref:"AR-2025-0298",stages:["Invoice issued","Payment matching","Aging review","Collections"],stageStatus:[true,true,true,true],details:[{label:"AR batch",val:"AR-2025-0298"},{label:"Period",val:"July 2025"},{label:"Total applied",val:"$1,200,000"},{label:"Invoices matched",val:"89"},{label:"Unmatched items",val:"2"},{label:"Accuracy",val:"97.8%"}],chat:[{from:"agent",name:"Nina",time:"05:00 PM",msg:"July month-end payment application complete. $1.2M matched across 89 invoices. Two remittances totaling $14,200 queued for manual review."},{from:"user",name:"Ana Torres",time:"05:05 PM",msg:"What were the two unmatched items?"},{from:"agent",name:"Nina",time:"05:06 PM",msg:"Payment 1: $9,800 from Horizon LLC — no invoice number. Likely INV-2025-0881. Payment 2: $4,400 from Delta Corp — partial on INV-2025-0762. Both in manual review folder."},{from:"user",name:"Ana Torres",time:"05:12 PM",msg:"I'll review those. Thanks Nina."},{from:"agent",name:"Nina",time:"05:12 PM",msg:"Month-end AR report sent to the finance distribution list. Closing balance and DSO metrics included."}]},
          {date:"Jul 15, 2025 · 10:30 AM",status:"In review",duration:"1h 20m",desc:"Disputed invoice resolution",ref:"AR-2025-0271",stages:["Invoice issued","Payment matching","Aging review","Collections"],stageStatus:[true,true,false,false],details:[{label:"AR batch",val:"AR-2025-0271"},{label:"Account",val:"Meridian Group"},{label:"Disputed amount",val:"$42,000"},{label:"Invoice",val:"INV-2025-0744"},{label:"Dispute reason",val:"Service quality"},{label:"Days outstanding",val:"45"}],chat:[{from:"agent",name:"Nina",time:"10:30 AM",msg:"Formal dispute received from Meridian Group for INV-2025-0744 ($42,000) — citing service quality issues from the July 1 delivery. Invoice placed on dispute hold."},{from:"user",name:"Carlos Aguilar",time:"10:45 AM",msg:"What documentation do we have on that delivery?"},{from:"agent",name:"Nina",time:"10:46 AM",msg:"Delivery confirmation dated July 1, signed by J. Hartman at Meridian. Satisfaction acknowledgment on file. Compiling dispute response package now."},{from:"user",name:"Carlos Aguilar",time:"11:00 AM",msg:"Send the package to Meridian and cc me."},{from:"agent",name:"Nina",time:"11:01 AM",msg:"Dispute package sent to Meridian AP contact and cc'd to you. 15-day resolution clock set — auto-escalates to collections if no response by July 30."}]},
        ]
      },
    },
  },
  es: {
    appName:"Beecker Agentes", catalogTab:"Catálogo de Agentes IA", dashboardTab:"Panel", agentLabel:"Agente",
    catalogTitle:"Catálogo de Agentes IA", dashboardTitle:"Panel",
    catalogSub:"24 agentes listos para producción que automatizan procesos empresariales de extremo a extremo. Selecciona un área para explorar agentes y ver fichas completas de capacidades.",
    dashboardSub:"Métricas de referencia ilustrativas, datos de rendimiento y una vista en vivo de los agentes desplegados en acción.",
    agents:"agentes", home:"Inicio", backTo:"Volver a", backToPlatform:"Volver al Panel",
    capabilitySheet:"FICHA DE CAPACIDADES", whatItDoes:"QUÉ HACE", businessProblem:"PROBLEMA DE NEGOCIO RESUELTO",
    idealUser:"USUARIO / OPERADOR IDEAL", keyFeatures:"CARACTERÍSTICAS Y CAPACIDADES CLAVE",
    inputsRequired:"ENTRADAS REQUERIDAS", outputsDeliverables:"SALIDAS Y ENTREGABLES",
    maturityReadiness:"MADUREZ Y PREPARACIÓN",
    limitations:"LIMITACIONES, DEPENDENCIAS Y REQUISITOS DE IMPLEMENTACIÓN",
    productionReady:"Listo para producción", transactionDetails:"Detalles de la transacción",
    processingTimeline:"Línea de tiempo de procesamiento", conversation:"Conversación",
    conversationSub:n=>`Entre ${n} (agente IA) y el usuario final`,
    messagePlaceholder:n=>`Mensaje a ${n}...`, send:"Enviar",
    processOverview:"Resumen del proceso", processOverviewSub:"Distribución actual por etapa del flujo",
    recentExceptions:"Excepciones recientes", recentExceptionsSub:"Pendientes de revisión humana",
    runHistory:"Historial de ejecuciones", runHistorySub:"Haz clic en una fila para ver el detalle y la conversación",
    pageOf:(a,b)=>`Página ${a} de ${b}`, prev:"Ant.", next:"Sig.",
    active:"Activo", viewDashboard:"Ver panel →",
    exceptionsPending:n=>`${n} excepción${n!==1?"es":""} pendiente${n!==1?"s":""} de revisión`,
    executionStart:"Inicio de ejecución", status:"Estado", duration:"Duración",
    description:"Descripción", reference:"Referencia", requests:"solicitudes",
    cycleTimeTitle:"Tiempo de ciclo: manual vs automatizado", cycleTimeSub:"Días para completar, por proceso",
    manual:"Manual", automated:"Automatizado",
    savingsTitle:"Ahorro anual estimado", savingsSub:"Miles de USD, por área de proceso",
    roiTitle:"ROI acumulado en 12 meses", roiSub:"Multiplicador de retorno desde el inicio",
    sampleAgentsLabel:"AGENTES DESPLEGADOS DE MUESTRA",
    sampleAgentsSub:"Haz clic en cualquier agente para ver su panel de monitoreo en vivo.",
    clickForCapability:"Haz clic en cualquier agente para ver su ficha completa de capacidades.",
    moreAgents: n => `+${n} más`,
    agentReply:ref=>`Gracias por tu mensaje. He registrado tu aportación y actualizaré el proceso. Te notificaré de cualquier cambio en el estado de ${ref}.`,
    trigger:"Disparador",
    kpis:[
      {value:"78%",label:"Reducción en tiempo de procesamiento manual",sub:"En H2R, P2P, O2C"},
      {value:"$2.4M",label:"Ahorro anual estimado por despliegue",sub:"10,000+ transacciones/mes"},
      {value:"3.8x",label:"ROI en los primeros 12 meses",sub:"H2R, P2P, O2C combinados"},
      {value:"62%",label:"Menor costo por transacción",sub:"vs. línea base completamente manual"},
    ],
    chartLabels:{
      cycleItems:["Factura","Creación OC","Incorporación","Viáticos"],
      months:["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"],
    },
    areaDescs:{
      h2r:"Automatización del ciclo de vida de RRHH de extremo a extremo, desde la apertura de vacantes hasta el procesamiento de jubilaciones.",
      p2p:"Automatización del ciclo de compras de extremo a extremo, desde la planificación de demanda hasta el procesamiento de facturas y desembolsos.",
      o2c:"Automatización completa del cumplimiento de pedidos y cuentas por cobrar, desde la recepción del pedido hasta la gestión de cartera.",
    },
    areaFulls:{ h2r:"Contratación a Jubilación", p2p:"Compra a Pago", o2c:"Pedido a Cobro" },
    statusLabels:{"In progress":"En progreso","Successful":"Exitoso","Completed":"Completado","In review":"En revisión"},
    agentDetails:{
      Fer:{
        module:"Planificación de Vacantes", trigger:"Nueva Vacante Detectada",
        what:"Detecta señales de nuevas vacantes en datos de personal, cambios organizacionales o eventos de rotación, e inicia automáticamente los flujos de solicitud, dirigiéndolos a los aprobadores correspondientes con datos de puesto prellenados.",
        problem:"Elimina el seguimiento manual de posiciones abiertas y el retraso entre la identificación de una vacante y la creación de la solicitud, reduciendo el tiempo de inicio de contratación.",
        users:["Socios de negocio de RRHH","Planificadores de fuerza laboral","Personal de operaciones de RRHH","Apoyo de la oficina del CHCO"],
        capabilities:["Monitorea flujos de datos de personal en busca de señales de vacantes","Prellena la solicitud con datos de clasificación del puesto","Dirige el borrador de solicitud a los aprobadores designados","Registra el evento disparador con marca de tiempo y fuente","Se integra con HRIS y sistemas de gestión de puestos"],
        inputs:["Datos de planificación de fuerza laboral","Registros de estructura organizacional","Avisos de rotación / separación","Datos de clasificación de puestos","Reglas de enrutamiento de aprobaciones"],
        outputs:["Registro de solicitud iniciada","Notificación de enrutamiento a aprobadores","Prellenado de datos del puesto","Registro de auditoría del evento disparador"],
        maturity:"Listo para producción. Patrón de despliegue repetible para entornos integrados con HRIS.",
        limits:["Requiere datos de puestos limpios para precompletar con precisión","Las señales de vacantes dependen de la calidad de datos del sistema HRIS","No toma decisiones de contratación","Requiere integración con HRIS y configuración de enrutamiento de aprobaciones"],
      },
      Lucas:{
        module:"Reclutamiento", trigger:"Nueva Solicitud Recibida",
        what:"Procesa solicitudes entrantes, evalúa candidatos según criterios definidos, organiza los datos de los aplicantes y dirige a los candidatos calificados a revisores humanos con resúmenes estructurados.",
        problem:"Reduce la carga del filtrado manual de solicitudes en contrataciones de alto volumen, asegurando una aplicación consistente de criterios y un movimiento más rápido de candidatos calificados hacia los tomadores de decisiones.",
        users:["Especialistas de RRHH","Gerentes de contratación","Oficiales de igualdad de oportunidades","Equipos de adquisición de talento"],
        capabilities:["Ingesta y normaliza solicitudes de múltiples canales","Aplica criterios de evaluación de forma consistente","Genera resúmenes estructurados de candidatos","Dirige a revisores humanos por puesto","Mantiene documentación EEO y registro de auditoría"],
        inputs:["Solicitudes de empleo y currículums","Requisitos del puesto / KSAs","Criterios y reglas de evaluación","Datos EEO","Resultados de evaluaciones"],
        outputs:["Lista de candidatos filtrados con puntuaciones","Resúmenes estructurados de candidatos","Cola de revisión dirigida","Paquete de documentación EEO","Registro de auditoría de la lógica de filtrado"],
        maturity:"Listo para producción. Desplegado en entornos de contratación de alto volumen con criterios configurables por puesto.",
        limits:["La calidad del filtrado depende de la claridad de los criterios definidos","No realiza selecciones de contratación — solo asesoría","Requiere revisión humana para todas las determinaciones de calificación","Se requiere integración con ATS"],
      },
      Isa:{
        module:"Selección, Contratación e Incorporación", trigger:"Nueva Contratación Detectada",
        what:"Gestiona flujos de ofertas, coordina la recopilación de documentación de contratación y ejecuta secuencias de tareas de incorporación estructuradas desde la aceptación de la oferta hasta la preparación para el primer día.",
        problem:"Elimina tareas omitidas y retrasos en el proceso de oferta a incorporación, asegurando que cada nuevo empleado complete los pasos requeridos a tiempo y que la documentación esté completa antes del primer día.",
        users:["Especialistas de incorporación de RRHH","Personal de seguridad / FSO","Equipos de aprovisionamiento de TI","Supervisores de nuevos empleados"],
        capabilities:["Activa secuencias de tareas de incorporación al confirmar la contratación","Rastrea la finalización de documentación en tiempo real","Inicia flujos de trabajo de verificación de antecedentes","Envía recordatorios automáticos por elementos incompletos","Coordina entre RRHH, TI y partes de seguridad"],
        inputs:["Confirmación de aceptación de oferta","Datos personales del nuevo empleado","Lista de verificación de documentación requerida","Reglas de verificación de antecedentes","Solicitudes de aprovisionamiento de TI","Plantillas de tareas de incorporación"],
        outputs:["Rastreador de tareas de incorporación completadas","Estado de finalización de documentación","Registro de inicio de verificación de antecedentes","Solicitud de acceso a TI","Confirmación de preparación para el primer día","Registro de auditoría"],
        maturity:"Listo para producción. El marco modular de tareas se adapta a los requisitos de incorporación de cada agencia.",
        limits:["No puede adjudicar autorizaciones ni determinar idoneidad","Depende de la capacidad de respuesta del nuevo empleado para la entrega de documentos","Los plazos de aprovisionamiento de TI dependen de la capacidad del sistema externo","Requiere integración con HRIS, sistema de verificación de antecedentes y mesa de servicio de TI"],
      },
      Ben:{
        module:"Desempeño y Desarrollo", trigger:"Evaluación de Desempeño Programada",
        what:"Programa y orquesta ciclos de evaluación de desempeño, recopila autoevaluaciones e insumos de gerentes, marca evaluaciones vencidas y consolida datos para informes de RRHH.",
        problem:"Previene fallas de cumplimiento por plazos de evaluación omitidos y reduce la carga administrativa de gerentes y personal de RRHH que gestionan ciclos de evaluación a gran escala.",
        users:["Especialistas de RRHH","Supervisores y gerentes","Personal de la oficina del CHCO","Equipos de L&D"],
        capabilities:["Programa ciclos de revisión y envía notificaciones a participantes","Recopila autoevaluaciones e insumos de gerentes mediante formularios estructurados","Rastrea el estado de finalización en toda la organización","Marca evaluaciones vencidas para escalamiento a RRHH","Consolida datos de evaluación para informes"],
        inputs:["Planilla de empleados y programas de revisión","Plantillas de planes de desempeño","Formularios de autoevaluación","Insumos de revisión de gerentes","Registros de capacitación y desarrollo"],
        outputs:["Panel de estado del ciclo de revisión","Paquetes de evaluación completados","Alertas de evaluaciones vencidas","Datos de desempeño consolidados","Informe de seguimiento de PDI","Registro de auditoría"],
        maturity:"Listo para producción. Configurable para ciclos de revisión anual, semestral y probatorio.",
        limits:["No asigna ni recomienda calificaciones de desempeño","La calidad depende de la participación oportuna del supervisor","No puede sustituir el juicio del gerente en la evaluación","Requiere integración con plataforma de gestión del desempeño"],
      },
      Lily:{
        module:"Compensación y Beneficios", trigger:"Período de Nómina Iniciado",
        what:"Activa el procesamiento del período de nómina, valida los datos de compensación contra registros de RRHH y reglas de política, y marca anomalías y discrepancias para revisión antes de ejecutar la nómina.",
        problem:"Reduce errores de nómina causados por datos desactualizados o inconsistentes, asegura que las elecciones de beneficios se reflejen con precisión y proporciona informes de excepciones accionables antes del desembolso.",
        users:["Especialistas de nómina","Administradores de beneficios","Personal de operaciones de RRHH","Analistas financieros / presupuestarios"],
        capabilities:["Activa flujos de validación al inicio del ciclo de nómina","Compara datos de compensación con registros de RRHH y reglas de política","Valida elecciones de beneficios contra datos de inscripción","Marca anomalías y las dirige al revisor","Genera informe de excepciones previo al desembolso"],
        inputs:["Calendario del período de nómina","Registros de compensación de empleados","Datos de elecciones de beneficios","Balances de licencia","Registros de acciones de personal","Reglas de negocio de nómina"],
        outputs:["Informe de validación pre-nómina","Lista de excepciones y anomalías","Resumen de conciliación de beneficios","Confirmación de balance de licencia","Excepciones dirigidas para aprobación","Registro de auditoría"],
        maturity:"Listo para producción. Compatible con ciclos de nómina quincenal, semimensual y mensual.",
        limits:["La calidad de validación depende de la oportunidad de los datos HRIS","No ejecuta la nómina — solo soporta la validación previa al procesamiento","No puede adjudicar disputas complejas de compensación","Requiere integración con sistema de nómina, HRIS y gestión de licencias"],
      },
      Lisa:{
        module:"Viajes y Gastos", trigger:"Solicitud de Reembolso de Viaje",
        what:"Procesa solicitudes de reembolso de viaje extrayendo datos del reclamo, validando contra reglas de viáticos y política de viajes, identificando excepciones y dirigiendo solicitudes conformes para aprobación.",
        problem:"Elimina la búsqueda manual de políticas y el cálculo de reclamos de viaje, reduce el tiempo de procesamiento, detecta violaciones de política antes del pago y crea un registro completo de auditoría.",
        users:["Viajeros / solicitantes","Administradores de viajes","Personal de operaciones financieras","Funcionarios aprobadores"],
        capabilities:["Extrae datos del reclamo de formularios y recibos enviados","Valida contra reglas de viáticos y política de viaje aplicables","Calcula montos permitidos vs. reclamados","Marca excepciones de política con citas específicas de reglas","Dirige solicitudes conformes para aprobación"],
        inputs:["Solicitudes de reembolso de viaje","Recibos y documentación de respaldo","Tasas de viáticos y reglas FTR/JTR","Registros de autorización de viaje","Reglas de enrutamiento de aprobaciones"],
        outputs:["Solicitud de reembolso validada","Resumen de cumplimiento de política","Marcas de excepciones con detalle","Paquete de aprobación dirigido","Registro de auditoría"],
        maturity:"Listo para producción. Configurable para políticas FTR, JTR y específicas de agencia.",
        limits:["La precisión de las tasas de viáticos depende del mantenimiento de la tabla de reglas","Circunstancias inusuales requieren juicio humano","La calidad del recibo afecta la precisión de extracción de datos","Se requiere integración con sistema de gestión de viajes"],
      },
      Cleo:{
        module:"Separación y Jubilación", trigger:"Notificación de Jubilación",
        what:"Gestiona flujos de trabajo de desvinculación y procesamiento de jubilación activados por notificaciones de separación, coordinando tareas entre RRHH, TI, seguridad, finanzas y beneficios para garantizar una desvinculación completa y conforme.",
        problem:"Previene brechas en la desvinculación que generan riesgos de seguridad, financieros o de cumplimiento, orquestando todos los pasos desde un único disparador.",
        users:["Especialistas de RRHH","Personal de seguridad / FSO","Administradores de TI","Equipos de nómina y beneficios","Supervisores"],
        capabilities:["Activa secuencias de tareas de desvinculación con múltiples partes","Coordina la revocación de autorizaciones y el cierre de acceso a TI","Calcula pago final, liquidación de licencias y continuación de beneficios","Rastrea la finalización de tareas entre departamentos","Genera paquetes de documentación de jubilación"],
        inputs:["Aviso de separación o jubilación","Registro del empleado e historial de servicio","Datos de balance final de licencia","Elecciones de continuación de beneficios","Inventario de activos de TI","Registros de autorizaciones y accesos"],
        outputs:["Rastreador de finalización de tareas de desvinculación","Paquete de cálculo de pago final","Solicitud de revocación de autorización","Confirmación de cierre de acceso a TI","Documentación de transición de beneficios","Registro de auditoría"],
        maturity:"Listo para producción. Gestiona escenarios de separación voluntaria, jubilación y RIF.",
        limits:["Los cálculos de beneficios de jubilación requieren precisión actualizada de reglas OPM","Los plazos de revocación dependen de la capacidad de la oficina de seguridad","Los casos complejos requieren manejo especializado","Requiere integración con HRIS, aprovisionamiento de TI y sistema de autorizaciones de seguridad"],
      },
      Alice:{
        module:"Planificación de Demanda", trigger:"Señal de Demanda Detectada",
        what:"Analiza señales de demanda de datos de programas, historial de consumo e insumos operacionales para iniciar flujos de planificación de adquisiciones y generar documentación preliminar de requisitos.",
        problem:"Reduce el retraso entre la identificación de una necesidad de misión y el inicio de la adquisición, mejorando la gestión de tiempos de entrega y reduciendo situaciones de emergencia o fuente única.",
        users:["Oficiales contratantes / CORs","Gerentes de programas","Personal de logística y cadena de suministro","Analistas presupuestarios"],
        capabilities:["Agrega señales de demanda de múltiples fuentes de datos de programas","Genera documentación preliminar de requisitos","Alinea pronósticos de demanda con datos del año fiscal","Inicia flujos de trabajo de planificación de adquisiciones","Marca riesgos de suministro basados en tiempos de entrega e inventario"],
        inputs:["Datos de demanda del programa","Registros históricos de consumo","Datos de presupuesto y año fiscal","Niveles de inventario","Datos del calendario del programa"],
        outputs:["Resumen de pronóstico de demanda","Registro de planificación de adquisiciones iniciado","Borrador de requisitos","Informe de alineación presupuestaria","Registro de auditoría"],
        maturity:"Listo para producción. Compatible con planificación anual de adquisiciones y monitoreo continuo de demanda.",
        limits:["La precisión del pronóstico depende de la calidad de los datos y la integridad del historial","No puede considerar cambios de misión no planificados sin insumos actualizados","Requiere integración con sistema de gestión de programas y sistema presupuestario"],
      },
      Jessica:{
        module:"Selección de Proveedores", trigger:"Necesidad de Proveedor Identificada",
        what:"Evalúa y puntúa candidatos de proveedores según criterios definidos como desempeño anterior, precios, estado de cumplimiento y datos de capacidad, produciendo resúmenes comparativos estructurados para tomadores de decisiones.",
        problem:"Reemplaza la investigación y puntuación manual de proveedores con una evaluación consistente y documentada que respalda decisiones defensibles de selección de fuentes.",
        users:["Oficiales contratantes","Funcionarios de selección de fuentes","Especialistas en pequeñas empresas","Gerentes de programas"],
        capabilities:["Consulta SAM.gov y listas de inhabilitación para estado de cumplimiento","Puntúa proveedores según criterios de evaluación definidos","Marca categorías de pequeñas empresas y elegibilidad para reservas","Genera resúmenes comparativos estructurados","Mantiene registro de auditoría de evaluación"],
        inputs:["Datos de capacidad del proveedor","Estado de registro en SAM.gov / EPLS","Registros de desempeño anterior","Datos de precios","Datos de clasificación de pequeñas empresas","Criterios de evaluación"],
        outputs:["Matriz comparativa de proveedores puntuada","Resumen de estado de cumplimiento","Marcas de elegibilidad para pequeñas empresas","Paquete de apoyo para selección de fuentes","Registro de auditoría"],
        maturity:"Listo para producción. Marco de criterios configurable por tipo de adquisición y categoría de reserva.",
        limits:["No puede hacer determinaciones finales de selección de fuentes — solo asesoría","La calidad de datos depende de la precisión del registro del proveedor","Las adquisiciones complejas requieren evaluación técnica adicional","Se requiere acceso a la API de SAM.gov"],
      },
      Elsa:{
        module:"Incorporación de Proveedores", trigger:"Nuevo Proveedor Aprobado",
        what:"Automatiza los flujos de registro de proveedores, incluida la recopilación de documentación, validación de datos, verificaciones de alineación con SAM.gov y configuración de datos maestros del proveedor en sistemas financieros.",
        problem:"Elimina la entrada manual de datos y la comunicación de ida y vuelta con proveedores durante el registro, reduciendo el tiempo de incorporación y asegurando la precisión de datos maestros antes de la primera transacción.",
        users:["Oficiales contratantes","Personal de AP / finanzas","Administradores de adquisiciones","Equipos de gestión de proveedores"],
        capabilities:["Recopila y valida documentación del proveedor","Verifica el estado de registro y vencimiento en SAM.gov","Valida datos bancarios y de enrutamiento de pagos","Crea registro maestro del proveedor en el sistema financiero","Devuelve envíos incompletos al proveedor"],
        inputs:["Solicitud de registro del proveedor","Documentación empresarial (NIT, bancaria)","Datos de registro en SAM.gov","Datos de clasificación del proveedor","Reglas de enrutamiento de aprobaciones"],
        outputs:["Registro maestro del proveedor validado","Confirmación de cumplimiento en SAM.gov","Resumen de verificación de datos bancarios","Notificación de finalización de incorporación","Registro de auditoría"],
        maturity:"Listo para producción. Compatible con configuración de nuevos proveedores y validación anual de re-registro en SAM.gov.",
        limits:["No puede verificar propiedad o interés beneficiario más allá de la documentación enviada","La precisión de SAM.gov depende del mantenimiento del registro del proveedor","Requiere acceso al maestro de proveedores del sistema financiero e integración con API de SAM.gov"],
      },
      Olivia:{
        module:"Creación de OC", trigger:"Requisición Aprobada",
        what:"Genera órdenes de compra a partir de requisiciones aprobadas, aplica verificaciones de validación de disponibilidad de fondos, vinculación de contratos e integridad de datos, y dirige para aprobación final antes de la emisión.",
        problem:"Elimina el borrador manual de OC, reduce errores de entrada de datos y asegura que cada OC esté debidamente financiada, vinculada a un contrato o autoridad, y aprobada antes del compromiso.",
        users:["Oficiales contratantes","Agentes de compras","Analistas presupuestarios","Gerentes de programas"],
        capabilities:["Genera OC a partir de datos de requisición aprobada","Verifica disponibilidad de fondos contra el sistema presupuestario","Valida vinculación de contrato y autoridad","Dirige para aprobación según umbral de monto","Registra obligación al momento de aprobación"],
        inputs:["Requisición aprobada","Datos de disponibilidad de fondos / presupuesto","Referencia de contrato o BPA","Especificaciones de artículo / servicio","Datos maestros del proveedor","Umbrales de aprobación"],
        outputs:["Borrador de OC con resultados de validación","Confirmación de disponibilidad de fondos","OC aprobada lista para emisión","Registro de obligación","Registro de auditoría"],
        maturity:"Listo para producción. Configurable para flujos de adquisición simplificada y compras basadas en contrato.",
        limits:["No puede crear contratos o instrumentos de adquisición","La verificación de fondos depende de datos del sistema presupuestario en tiempo real","Las modificaciones complejas requieren acción manual de contratación","Requiere integración con ERP/sistema de gestión financiera y sistema presupuestario"],
      },
      Chris:{
        module:"Recepción de Bienes", trigger:"Entrega Recibida",
        what:"Registra y valida recibos de bienes y servicios contra datos de la orden de compra, identifica discrepancias en cantidad, condición o especificaciones, y dirige excepciones para aceptación autorizada.",
        problem:"Elimina entradas manuales en el registro de recepción, asegura que la documentación de recibo esté completa antes de iniciar el procesamiento de facturas y crea un registro confiable para la ejecución de la conciliación tripartita.",
        users:["Personal de recepción / almacén","CORs / COTRs","Administradores de propiedades","Equipos de AP"],
        capabilities:["Registra recibo contra líneas de la OC","Valida coincidencias de cantidad y especificación","Marca faltantes, sobrantes o bienes dañados","Genera informe estructurado de recepción","Actualiza registros de responsabilidad de propiedades"],
        inputs:["Documentación de entrega / lista de empaque","Datos de la orden de compra","Criterios de inspección","Reglas de responsabilidad de propiedades","Designación de autoridad de aceptación"],
        outputs:["Informe de recepción validado","Marcas de discrepancia con detalle","Actualización de registro de propiedades","Confirmación de aceptación","Registro de entrada para conciliación tripartita","Registro de auditoría"],
        maturity:"Listo para producción. Compatible con escenarios de entrega completa y parcial con reglas de aceptación configurables.",
        limits:["No puede realizar inspección física — solo soporta documentación","La evaluación de condición requiere un inspector humano","El manejo de entregas parciales requiere reglas de negocio definidas","Requiere integración con sistema de OC y sistema de gestión de propiedades"],
      },
      Tony:{
        module:"Gestión de Inventario", trigger:"Actualización de Inventario Detectada",
        what:"Monitorea niveles de inventario entre ubicaciones, marca puntos de reorden y agotamientos, reconcilia discrepancias entre conteos físicos y registros del sistema, y genera informes de estado de inventario.",
        problem:"Previene agotamientos e inventario excesivo mediante monitoreo proactivo, reduce el trabajo manual de conciliación y mantiene registros precisos de propiedades requeridos para auditoría.",
        users:["Personal de cadena de suministro / logística","Administradores de propiedades","Equipos de adquisiciones","Analistas financieros / presupuestarios"],
        capabilities:["Monitorea niveles de existencias contra umbrales de reorden definidos","Reconcilia registros del sistema con datos de conteo físico","Marca discrepancias y las dirige para investigación","Identifica inventario excedente y obsoleto","Genera informes de inventario listos para auditoría"],
        inputs:["Datos del sistema de inventario","Registros de conteo físico","Reglas de punto de reorden","Datos de responsabilidad de propiedades","Historial de consumo"],
        outputs:["Informe de estado de inventario","Recomendaciones de reorden","Marcas de discrepancias","Resumen de conciliación","Identificación de propiedades excedentes","Registro de auditoría"],
        maturity:"Listo para producción. Compatible con inventario en múltiples ubicaciones con reglas configurables de reorden y responsabilidad.",
        limits:["La precisión depende de datos del sistema en tiempo real y frecuencia de conteo físico","No puede verificar inventario físico de forma independiente","Las recomendaciones de disposición requieren revisión humana y regulatoria","Requiere integración con sistema de gestión de inventario y propiedades"],
      },
      Ryan:{
        module:"Gestión de Devoluciones", trigger:"Solicitud de Devolución Iniciada",
        what:"Procesa solicitudes de devolución de proveedores documentando el motivo, coordinando con proveedores, iniciando flujos de crédito o reemplazo y actualizando registros de inventario y financieros.",
        problem:"Reemplaza la coordinación manual de devoluciones con un proceso estructurado y documentado que asegura la recepción de créditos, la actualización precisa del inventario y la rendición de cuentas del proveedor.",
        users:["Personal de recepción / suministros","Oficiales contratantes","Equipos de AP","Administradores de propiedades"],
        capabilities:["Inicia flujo de trabajo de autorización de devolución","Notifica al proveedor con documentación estructurada de devolución","Rastrea la recepción de crédito o reemplazo","Actualiza registros de inventario al confirmar la devolución","Mantiene registro de auditoría de devoluciones"],
        inputs:["Solicitud de devolución con código de motivo","Datos de la OC y recibo originales","Contacto del proveedor e instrucciones de devolución","Registros de inventario","Reglas de crédito / reemplazo"],
        outputs:["Registro de autorización de devolución","Notificación de devolución al proveedor","Solicitud de crédito o reemplazo","Registro de inventario actualizado","Registro de auditoría"],
        maturity:"Listo para producción. Gestiona escenarios de bienes defectuosos, entregas en exceso y devoluciones por garantía.",
        limits:["La capacidad de respuesta del proveedor afecta el tiempo del ciclo","Los casos complejos de garantía o disputa requieren la participación del oficial contratante","Requiere acceso al sistema de inventario e integración de comunicación con proveedores"],
      },
      Daniel:{
        module:"Procesamiento de Facturas y Conciliación Tripartita", trigger:"Factura Recibida",
        what:"Automatiza la revisión de facturas de proveedores contra órdenes de compra, registros de recepción y reglas de negocio para identificar coincidencias, discrepancias y excepciones que requieren revisión humana.",
        problem:"Reduce el esfuerzo manual en la revisión de facturas, mejora la precisión, acelera los ciclos de procesamiento y permite al personal de AP enfocarse en la gestión de excepciones en lugar de la verificación repetitiva de transacciones rutinarias.",
        users:["Equipos de AP","Analistas de adquisiciones","Personal de operaciones financieras","Personal de servicios compartidos"],
        capabilities:["Extrae y normaliza datos de facturas y documentos de respaldo","Compara detalles de la factura con registros de OC y recibo a nivel de línea","Marca discrepancias de cantidad, precio o documentación","Dirige excepciones a revisores designados","Crea resúmenes de procesamiento listos para auditoría"],
        inputs:["Facturas de proveedores","Órdenes de compra","Registros de recepción de bienes","Datos maestros del proveedor","Reglas de aprobación y umbrales de tolerancia","Datos de ERP"],
        outputs:["Resultado de conciliación tripartita","Informe de discrepancias","Cola de excepciones","Recomendación de aprobación","Registro de auditoría"],
        maturity:"Listo para producción. Patrón de despliegue repetible para flujos financieros orientados a documentos.",
        limits:["El rendimiento depende de la calidad del documento y la legibilidad del OCR","Requiere registros completos de OC y recibo para ejecutar la conciliación","La autoridad de aprobación final permanece con el personal autorizado","Requiere integración con ERP y definición de reglas y umbrales de conciliación"],
      },
      David:{
        module:"Procesamiento de Pagos", trigger:"Factura Aprobada para Pago",
        what:"Valida las facturas aprobadas para su preparación de pago, aplica verificaciones previas al pago y dirige los paquetes de pago al canal de desembolso o sistema de tesorería correspondiente.",
        problem:"Reduce errores y retrasos de pago al asegurar que todas las aprobaciones y documentación requeridas estén completas antes de iniciar el desembolso, y crea una entrega limpia a la ejecución del pago.",
        users:["Personal de AP / desembolso","Equipos de operaciones financieras","Analistas presupuestarios","Personal de servicios compartidos"],
        capabilities:["Valida la integridad del paquete de facturas aprobadas","Confirma la precisión de los datos bancarios del proveedor","Aplica verificaciones de reglas de negocio previas al pago","Dirige al canal de pago apropiado (EFT, cheque, IPAC)","Registra datos de desembolso para informes financieros"],
        inputs:["Paquete de facturas aprobadas","Datos bancarios / de pago del proveedor","Certificación de fondos","Reglas de método de pago","Datos de enrutamiento de Tesorería / IPAC"],
        outputs:["Paquete listo para pago","Resultados de validación previa al pago","Confirmación de enrutamiento de pago","Registro de desembolso","Registro de auditoría"],
        maturity:"Listo para producción. Compatible con canales de pago EFT, cheque e IPAC con reglas de enrutamiento configurables.",
        limits:["No ejecuta pagos de forma independiente — solo prepara y dirige","Depende de la integridad del paquete de facturas aprobadas","La integración con IPAC y Tesorería requiere configuración específica de la agencia"],
      },
      Nico:{
        module:"Procesamiento de Pedidos", trigger:"Nuevo Pedido Recibido",
        what:"Ingesta y valida pedidos entrantes de clientes internos o externos, aplica reglas de negocio para integridad y autorización, e inicia flujos de trabajo de cumplimiento.",
        problem:"Elimina la recepción y enrutamiento manual de pedidos, reduce errores en el punto de entrada y acelera el tiempo desde la recepción del pedido hasta el inicio del cumplimiento.",
        users:["Personal de gestión de pedidos","Coordinadores de cadena de suministro","Gerentes de programas","Equipos de servicio al cliente"],
        capabilities:["Ingesta pedidos de múltiples canales (EDI, portal, manual)","Valida contra datos de autorización, catálogo e inventario","Dirige excepciones para revisión humana","Inicia flujo de trabajo de cumplimiento al validar","Envía acuse de recibo del pedido al cliente"],
        inputs:["Datos del pedido entrante","Datos de autorización del cliente / agencia","Catálogo de productos o servicios","Datos de disponibilidad de inventario","Reglas de enrutamiento"],
        outputs:["Registro de pedido validado","Disparador de inicio de cumplimiento","Acuse de recibo del pedido","Marcas de excepción para pedidos incompletos","Registro de auditoría"],
        maturity:"Listo para producción. Compatible con recepción de pedidos multicanal con reglas de validación configurables.",
        limits:["La calidad de validación depende de la integridad de datos al envío","Los tipos de pedido inusuales pueden requerir manejo manual","Requiere integración con sistema de gestión de pedidos y sistema de inventario"],
      },
      Diana:{
        module:"Planificación de Entregas", trigger:"Pedido Validado",
        what:"Planifica y programa la logística de entrega basándose en datos de pedidos validados, disponibilidad de inventario y requisitos de entrega del cliente, generando calendarios de entrega optimizados.",
        problem:"Reemplaza la planificación manual de entregas con un proceso automatizado y basado en datos que reduce retrasos y mejora el rendimiento de entrega a tiempo.",
        users:["Coordinadores de logística","Planificadores de cadena de suministro","Gerentes de almacén","Gerentes de programas"],
        capabilities:["Genera calendarios de entrega basados en datos de pedido e inventario","Asigna recursos de almacén al cumplimiento de pedidos","Marca riesgos de SLA según la capacidad actual","Recomienda asignaciones de transportistas","Actualiza el plan de entrega según cambien las condiciones"],
        inputs:["Datos del pedido validado","Datos de inventario y almacén","Requisitos de entrega del cliente","Reglas de SLA / compromisos de entrega","Datos de capacidad del transportista"],
        outputs:["Calendario de entrega","Plan de recursos y capacidad","Pronóstico de cumplimiento de SLA","Recomendaciones de asignación de transportista","Registro de auditoría"],
        maturity:"Listo para producción. Configurable para entornos de cumplimiento en una o múltiples ubicaciones.",
        limits:["La precisión de planificación depende de datos de inventario y transportista en tiempo real","Las interrupciones imprevistas requieren re-planificación humana","Requiere integración con gestión de pedidos, almacén y datos de transportistas"],
      },
      James:{
        module:"Planificación de Transporte", trigger:"Entrega Programada",
        what:"Optimiza el enrutamiento y la selección de transportistas para envíos salientes basándose en requisitos de entrega, parámetros de costo, reglas de cumplimiento y disponibilidad de transportistas.",
        problem:"Reemplaza la selección manual de transportistas y enrutamiento con optimización automatizada que reduce costos de envío, mejora la confiabilidad de entrega y asegura la documentación de cumplimiento del transportista.",
        users:["Coordinadores de transporte","Gerentes de logística","Oficiales contratantes","Personal de cadena de suministro"],
        capabilities:["Evalúa opciones de transportistas según criterios de costo, cumplimiento y capacidad","Genera recomendaciones de enrutamiento optimizadas","Documenta cumplimiento del transportista (pequeñas empresas, AbilityOne, etc.)","Crea paquetes de instrucciones de envío","Rastrea el fundamento de selección del transportista para auditoría"],
        inputs:["Datos del calendario de entrega","Base de datos de transportistas y tarifas","Reglas de optimización de enrutamiento","Requisitos de cumplimiento (tipo de transportista, reserva)","Especificaciones del envío"],
        outputs:["Plan de enrutamiento optimizado","Recomendación de selección de transportista","Documentación de cumplimiento","Paquete de instrucciones de envío","Registro de auditoría"],
        maturity:"Listo para producción. Compatible con entornos multi-transportista con conjuntos de reglas de cumplimiento configurables.",
        limits:["La optimización de enrutamiento depende de la actualización de datos del transportista","Los envíos sensibles o clasificados requieren protocolos de seguridad adicionales fuera del alcance del agente","Requiere integración con base de datos de transportistas y motor de enrutamiento"],
      },
      Julia:{
        module:"Logística de Salida", trigger:"Envío Listo para Despacho",
        what:"Gestiona la ejecución del envío saliente, incluida la generación de documentos de envío, coordinación de entrega al transportista, inicio de seguimiento y procesamiento de confirmación de entrega.",
        problem:"Elimina la preparación manual de documentos de envío y la coordinación de entrega, asegura que toda la documentación requerida acompañe los envíos y crea un registro de seguimiento en tiempo real.",
        users:["Personal de almacén / envíos","Coordinadores de logística","Administradores de propiedades","Gerentes de programas"],
        capabilities:["Genera conocimientos de embarque y documentación de envío","Coordina la recogida y entrega al transportista","Inicia el seguimiento del envío","Procesa la confirmación de entrega al recibirla","Marca excepciones y retrasos en envíos"],
        inputs:["Plan de envío aprobado","Lista de empaque y datos de artículos","Instrucciones del transportista","Requisitos regulatorios de envío","Reglas de confirmación de entrega del cliente"],
        outputs:["Paquete de documentación de envío","Confirmación de entrega al transportista","Número de rastreo y registro del envío","Confirmación de entrega","Registro de auditoría"],
        maturity:"Listo para producción. Compatible con tipos de envío estándar y regulado con integración de API del transportista.",
        limits:["No puede reemplazar los procesos físicos de inspección o empaque","El manejo de materiales peligrosos y artículos clasificados requiere supervisión especializada","La disponibilidad de la API del transportista afecta el seguimiento en tiempo real","Requiere gestión de almacén y conectividad con API del transportista"],
      },
      Mia:{
        module:"Gestión de Crédito", trigger:"Transacción de Alto Riesgo Detectada",
        what:"Evalúa la exposición crediticia y el riesgo financiero de transacciones y cuentas de clientes, marca situaciones de alto riesgo para revisión humana y genera resúmenes del estado de crédito.",
        problem:"Proporciona visibilidad proactiva de riesgos en saldos de cuentas por cobrar y exposición de transacciones, reduciendo la probabilidad de cuentas incobrables y apoyando decisiones crediticias informadas.",
        users:["Personal de cuentas por cobrar","Gerentes financieros","Gerentes de programas","Analistas presupuestarios"],
        capabilities:["Evalúa la exposición crediticia a nivel de cuenta contra límites definidos","Marca transacciones que superan umbrales de riesgo","Genera resúmenes de estado de crédito por cliente / agencia","Rastrea tendencias de historial de pagos","Dirige marcas de alto riesgo para revisión humana"],
        inputs:["Datos de cuenta del cliente / agencia","Historial de transacciones","Saldos pendientes de cuentas por cobrar","Reglas de límite de crédito","Datos de historial de pagos"],
        outputs:["Evaluación de riesgo crediticio","Marcas de transacciones de alto riesgo","Resumen de estado de cuenta","Informe de utilización de límite de crédito","Registro de auditoría"],
        maturity:"Listo para producción. Reglas de límite de crédito configurables por tipo de cuenta y categoría de transacción.",
        limits:["La evaluación de riesgo se basa solo en datos financieros disponibles","No puede considerar obligaciones fuera del sistema o pasivos no registrados","Requiere integración con sistema de cuentas por cobrar y configuración de reglas de límite de crédito"],
      },
      Nina:{
        module:"Cuentas por Cobrar", trigger:"Factura Emitida",
        what:"Gestiona los flujos de trabajo de cuentas por cobrar aplicando pagos entrantes a facturas abiertas, marcando cuentas vencidas, generando informes de antigüedad e iniciando seguimiento de cobros.",
        problem:"Reduce los días de ventas pendientes y los saldos incobrables automatizando la aplicación de pagos, identificando proactivamente cuentas vencidas y asegurando que las acciones de cobro se tomen de manera consistente.",
        users:["Personal de cuentas por cobrar","Gerentes financieros","Analistas presupuestarios","Oficiales de cobros"],
        capabilities:["Aplica pagos entrantes a registros de facturas abiertas","Genera informes de antigüedad de cuentas por cobrar por cuenta y período","Marca cuentas vencidas e inicia seguimiento de cobros","Reconcilia discrepancias en facturación entre agencias","Produce datos para informes de estados financieros"],
        inputs:["Facturas emitidas / registros de facturación","Datos de pagos entrantes","Reglas de antigüedad y umbrales de cobro","Datos de cuenta del cliente / agencia","Reglas de cobro de deudas"],
        outputs:["Registros de aplicación de pagos","Informe de antigüedad de cuentas por cobrar","Alertas de cuentas vencidas","Inicio de acción de cobro","Datos de informes financieros","Registro de auditoría"],
        maturity:"Listo para producción. Compatible con flujos de trabajo de CxC estándar e interinstitucionales con reglas configurables de antigüedad y cobros.",
        limits:["La precisión de aplicación de pagos depende de la coincidencia de datos de facturas y remesas","La escalación de cobro más allá del seguimiento automatizado requiere participación humana y legal","Requiere integración con sistema de gestión financiera / CxC y fuente de datos de recepción de pagos"],
      },
    },
    exceptions:{
      Daniel:[
        {type:"Discrepancia de precio en línea 3",ref:"INV-2025-1038",severity:"high"},
        {type:"Referencia de OC faltante",ref:"INV-2025-1035",severity:"medium"},
        {type:"Factura duplicada detectada",ref:"INV-2025-1031",severity:"medium"},
        {type:"Discrepancia de cantidad — sobreentrega",ref:"INV-2025-1027",severity:"high"},
        {type:"Datos bancarios del proveedor no coinciden",ref:"INV-2025-1022",severity:"high"},
        {type:"Monto de factura excede techo del BPA",ref:"INV-2025-1018",severity:"medium"},
      ],
      Isa:[
        {type:"Documentación I-9 faltante",ref:"OB-2025-0094",severity:"high"},
        {type:"Verificación de antecedentes demorada >10 días",ref:"OB-2025-0089",severity:"high"},
        {type:"Solicitud de aprovisionamiento de TI bloqueada",ref:"OB-2025-0087",severity:"medium"},
        {type:"Inscripción a beneficios no completada",ref:"OB-2025-0085",severity:"medium"},
        {type:"Formulario de contacto de emergencia faltante",ref:"OB-2025-0083",severity:"medium"},
        {type:"Conflicto de fecha de inicio con autorización de seguridad",ref:"OB-2025-0080",severity:"high"},
      ],
      Nina:[
        {type:"Pago aplicado a factura incorrecta",ref:"AR-2025-0315",severity:"high"},
        {type:"Aviso de remesa faltante",ref:"AR-2025-0310",severity:"medium"},
        {type:"Disputa de facturación interinstitucional",ref:"AR-2025-0307",severity:"high"},
        {type:"DSO superó umbral de 45 días",ref:"AR-2025-0299",severity:"high"},
        {type:"Pago parcial sin conciliar",ref:"AR-2025-0295",severity:"medium"},
        {type:"Pago duplicado detectado",ref:"AR-2025-0288",severity:"high"},
      ],
    },
    runData:{
      Daniel:{
        runs:[
          {date:"05 Ago 2025 · 11:41 AM",status:"In progress",duration:"1m 26s",desc:"Lote de validación de facturas",ref:"INV-2025-1042",stages:["Factura recibida","Extracción de datos","Conciliación 2 vías","Actualización de registro"],stageStatus:[true,true,false,false],details:[{label:"Número de factura",val:"INV-2025-1042"},{label:"Proveedor",val:"DHL Express México"},{label:"Monto",val:"$4,320.00"},{label:"Referencia OC",val:"OC-0842"},{label:"Departamento",val:"Logística"},{label:"Método de pago",val:"TEF"}],chat:[{from:"agent",name:"Daniel",time:"11:41 AM",msg:"Hola, he recibido la factura INV-2025-1042 de DHL Express México por $4,320.00. Actualmente ejecuto la conciliación tripartita contra la OC-0842. Te notificaré si encuentro alguna discrepancia."},{from:"user",name:"Carlos Aguilar",time:"11:43 AM",msg:"Gracias Daniel, por favor marca cualquier variación mayor al 2% en las líneas."},{from:"agent",name:"Daniel",time:"11:43 AM",msg:"Entendido. He actualizado mi tolerancia de conciliación para marcar variaciones por encima del 2%. Continuando la validación."},{from:"user",name:"Carlos Aguilar",time:"11:50 AM",msg:"¿Alguna actualización? Necesitamos cerrar esto antes de fin de día."},{from:"agent",name:"Daniel",time:"11:50 AM",msg:"Actualmente en la etapa de conciliación a 2 vías. Las líneas 1–6 coincidieron correctamente. La línea 7 muestra una variación de $48 — dentro del umbral del 2%. Finalización estimada en 3 minutos."}]},
          {date:"22 Jul 2025 · 03:15 PM",status:"Successful",duration:"1m 26s",desc:"Lote de conciliación tripartita",ref:"INV-2025-1041",stages:["Factura recibida","Extracción de datos","Conciliación 2 vías","Actualización de registro"],stageStatus:[true,true,true,true],details:[{label:"Número de factura",val:"INV-2025-1041"},{label:"Proveedor",val:"Francisco Javier Olvera"},{label:"Monto",val:"$1,850.00"},{label:"Referencia OC",val:"OC-0839"},{label:"Departamento",val:"Transporte"},{label:"Método de pago",val:"Tarjeta Corporativa"}],chat:[{from:"agent",name:"Daniel",time:"03:15 PM",msg:"Factura INV-2025-1041 de Francisco Javier Olvera recibida. Iniciando validación contra OC-0839."},{from:"user",name:"Ana Torres",time:"03:17 PM",msg:"Este proveedor ha tenido problemas antes — por favor verifica bien la documentación de recibo."},{from:"agent",name:"Daniel",time:"03:17 PM",msg:"Confirmado. Estoy cruzando referencias con los registros de recepción del 20 de julio. Cantidades y precios coinciden. La factura ha sido aprobada y dirigida para pago."},{from:"user",name:"Ana Torres",time:"03:20 PM",msg:"Excelente, gracias. Por favor envía el resumen de auditoría a finanzas."},{from:"agent",name:"Daniel",time:"03:20 PM",msg:"Resumen de auditoría generado y enviado a finanzas@empresa.com. Registro actualizado correctamente."}]},
          {date:"10 Jun 2025 · 08:32 AM",status:"In review",duration:"1m 26s",desc:"Lote de conciliación de OC",ref:"INV-2025-1040",stages:["Factura recibida","Extracción de datos","Conciliación 2 vías","Actualización de registro"],stageStatus:[true,false,false,false],details:[{label:"Número de factura",val:"INV-2025-1040"},{label:"Proveedor",val:"Alezo Logistics"},{label:"Monto",val:"$9,100.00"},{label:"Referencia OC",val:"No encontrada"},{label:"Departamento",val:"Operaciones"},{label:"Método de pago",val:"TEF"}],chat:[{from:"agent",name:"Daniel",time:"08:32 AM",msg:"Factura INV-2025-1040 recibida de Alezo Logistics por $9,100.00. No pude localizar una referencia de OC coincidente en el documento. Se ha marcado para revisión humana."},{from:"user",name:"Carlos Aguilar",time:"08:35 AM",msg:"¿Puedes verificar si hay una OC abierta para Alezo en el sistema?"},{from:"agent",name:"Daniel",time:"08:35 AM",msg:"Busqué acuerdos marco activos con Alezo Logistics. Encontré BPA-0012 que cubre servicios logísticos hasta $8,000. El monto de $9,100 excede el techo del BPA — esto requiere revisión del oficial contratante."},{from:"user",name:"Carlos Aguilar",time:"08:40 AM",msg:"Bien, lo escalo al OC. Retén la factura hasta que haya aprobación."},{from:"agent",name:"Daniel",time:"08:40 AM",msg:"Factura en espera. He creado el ticket de excepción #EXC-2025-088 y notificado al oficial contratante. Te informaré cuando haya una decisión."}]},
        ]
      },
      Isa:{
        runs:[
          {date:"12 Ago 2025 · 09:00 AM",status:"In progress",duration:"3d 4h",desc:"Incorporación nuevo empleado — Sarah Mitchell",ref:"OB-2025-0091",stages:["Oferta aceptada","Documentación","Verificación antecedentes","Aprovisionamiento TI"],stageStatus:[true,true,false,false],details:[{label:"ID de incorporación",val:"OB-2025-0091"},{label:"Nuevo empleado",val:"Sarah Mitchell"},{label:"Puesto",val:"Analista de Programas GS-11"},{label:"Fecha de inicio",val:"01 Sep 2025"},{label:"Departamento",val:"Operaciones TI"},{label:"Nivel de seguridad",val:"Confianza Pública"}],chat:[{from:"agent",name:"Isa",time:"09:00 AM",msg:"¡Bienvenida Sarah! Soy Isa, tu asistente de incorporación. He recibido tu aceptación de oferta — ¡felicitaciones por unirte al equipo! Te guiaré en los próximos pasos."},{from:"user",name:"Sarah Mitchell",time:"09:05 AM",msg:"¡Gracias! ¿Qué necesito hacer primero?"},{from:"agent",name:"Isa",time:"09:05 AM",msg:"Te he enviado una lista de verificación de documentación a tu correo personal. Deberás completar tu I-9, formulario de contacto de emergencia e inscripción a beneficios en los próximos 3 días hábiles."},{from:"user",name:"Sarah Mitchell",time:"09:20 AM",msg:"Ya envié todo. ¿Cuánto tarda la verificación de antecedentes?"},{from:"agent",name:"Isa",time:"09:20 AM",msg:"Las autorizaciones de Confianza Pública suelen tomar 5–7 días hábiles. Te enviaré una actualización en cuanto se apruebe."}]},
          {date:"28 Jul 2025 · 10:15 AM",status:"Completed",duration:"4d 2h",desc:"Incorporación nuevo empleado — Marcus Lee",ref:"OB-2025-0088",stages:["Oferta aceptada","Documentación","Verificación antecedentes","Aprovisionamiento TI"],stageStatus:[true,true,true,true],details:[{label:"ID de incorporación",val:"OB-2025-0088"},{label:"Nuevo empleado",val:"Marcus Lee"},{label:"Puesto",val:"Analista Senior GS-13"},{label:"Fecha de inicio",val:"04 Ago 2025"},{label:"Departamento",val:"Finanzas"},{label:"Nivel de seguridad",val:"Secreto"}],chat:[{from:"agent",name:"Isa",time:"10:15 AM",msg:"Hola Marcus, soy Isa. Tu oferta está confirmada. He prellenado tu SF-86 — por favor revísalo y fírmalo en las próximas 48 horas."},{from:"user",name:"Marcus Lee",time:"10:30 AM",msg:"Listo. ¿Qué sigue?"},{from:"agent",name:"Isa",time:"10:30 AM",msg:"Verificación de antecedentes enviada. Equipo de seguridad TI notificado para aprovisionamiento de nivel Secreto. Tiempo estimado: 10 días hábiles."},{from:"user",name:"Marcus Lee",time:"03 Ago · 2:00 PM",msg:"¿Estoy listo para mañana?"},{from:"agent",name:"Isa",time:"03 Ago · 2:05 PM",msg:"¡Sí! Verificación aprobada. Laptop llega a las 9 AM. Credenciales enviadas a tu correo laboral. ¡Bienvenido al equipo!"}]},
          {date:"10 Jul 2025 · 02:00 PM",status:"In review",duration:"1d 6h",desc:"Incorporación nuevo empleado — Diana Reyes",ref:"OB-2025-0081",stages:["Oferta aceptada","Documentación","Verificación antecedentes","Aprovisionamiento TI"],stageStatus:[true,false,false,false],details:[{label:"ID de incorporación",val:"OB-2025-0081"},{label:"Nuevo empleado",val:"Diana Reyes"},{label:"Puesto",val:"Analista GS-9"},{label:"Fecha de inicio",val:"01 Ago 2025"},{label:"Departamento",val:"RRHH"},{label:"Nivel de seguridad",val:"Confianza Pública"}],chat:[{from:"agent",name:"Isa",time:"02:00 PM",msg:"¡Hola Diana, felicitaciones! Soy Isa. Te he enviado tu paquete de documentación — completa todos los formularios en los próximos 2 días hábiles."},{from:"user",name:"Diana Reyes",time:"11 Jul · 9:00 AM",msg:"Tengo pasaporte extranjero y visa de trabajo para mi I-9. ¿Es aceptable?"},{from:"agent",name:"Isa",time:"11 Jul · 9:02 AM",msg:"Sí, un pasaporte extranjero válido más tu registro de llegada I-94 es un documento aceptable de Lista A. Por favor sube ambos al portal."},{from:"user",name:"Diana Reyes",time:"11 Jul · 11:00 AM",msg:"Subí ambos. ¿Algo más pendiente de mi parte?"},{from:"agent",name:"Isa",time:"11 Jul · 11:01 AM",msg:"RRHH está revisando tu I-9 ahora. Una vez aprobado, te avanzaré a la etapa de verificación de antecedentes. Te notificaré en 24 horas."}]},
        ]
      },
      Nina:{
        runs:[
          {date:"10 Ago 2025 · 08:00 AM",status:"In progress",duration:"2d 3h",desc:"Revisión de antigüedad CxC — cobros Q3",ref:"AR-2025-0312",stages:["Factura emitida","Aplicación de pagos","Revisión de antigüedad","Cobros"],stageStatus:[true,true,true,false],details:[{label:"Lote CxC",val:"AR-2025-0312"},{label:"Período",val:"Q3 2025"},{label:"Saldo abierto",val:"$184,500"},{label:"Cuentas revisadas",val:"42"},{label:"Cuentas vencidas",val:"3"},{label:"DSO",val:"18 días"}],chat:[{from:"agent",name:"Nina",time:"08:00 AM",msg:"Buenos días. Revisión de antigüedad Q3 completa. Tres cuentas están vencidas: Grupo Meridian ($42,000, 45 días), Apex Solutions ($18,200, 32 días) y Coastal Partners ($9,100, 28 días). Iniciando seguimiento de cobros."},{from:"user",name:"Ana Torres",time:"08:15 AM",msg:"Meridian es un problema recurrente. Escala a legal."},{from:"agent",name:"Nina",time:"08:15 AM",msg:"Escalando Grupo Meridian a cobros legales. Resumen de deuda preparado y enviado a legal@empresa.com."},{from:"user",name:"Ana Torres",time:"08:20 AM",msg:"Para Apex y Coastal, envía primero un aviso estándar de vencimiento."},{from:"agent",name:"Nina",time:"08:20 AM",msg:"Avisos de vencimiento enviados a Apex y Coastal con ventanas de respuesta de 10 días. Escalación automática programada para el 20 de agosto."}]},
          {date:"31 Jul 2025 · 05:00 PM",status:"Successful",duration:"45m",desc:"Aplicación mensual de pagos",ref:"AR-2025-0298",stages:["Factura emitida","Aplicación de pagos","Revisión de antigüedad","Cobros"],stageStatus:[true,true,true,true],details:[{label:"Lote CxC",val:"AR-2025-0298"},{label:"Período",val:"Julio 2025"},{label:"Total aplicado",val:"$1,200,000"},{label:"Facturas conciliadas",val:"89"},{label:"Sin conciliar",val:"2"},{label:"Precisión",val:"97.8%"}],chat:[{from:"agent",name:"Nina",time:"05:00 PM",msg:"Aplicación de pagos de fin de mes julio completada. $1.2M conciliados en 89 facturas. Dos remesas por $14,200 en cola para revisión manual."},{from:"user",name:"Ana Torres",time:"05:05 PM",msg:"¿Cuáles fueron los dos sin conciliar?"},{from:"agent",name:"Nina",time:"05:06 PM",msg:"Pago 1: $9,800 de Horizon LLC — sin número de factura. Probablemente coincide con INV-2025-0881. Pago 2: $4,400 de Delta Corp — pago parcial de INV-2025-0762. Ambos en carpeta de revisión manual con mis notas."},{from:"user",name:"Ana Torres",time:"05:12 PM",msg:"Los revisaré ahora. Gracias Nina."},{from:"agent",name:"Nina",time:"05:12 PM",msg:"Informe de CxC de fin de mes enviado a la lista de distribución de finanzas. Incluye saldo de cierre y métricas de DSO."}]},
          {date:"15 Jul 2025 · 10:30 AM",status:"In review",duration:"1h 20m",desc:"Resolución de factura en disputa",ref:"AR-2025-0271",stages:["Factura emitida","Aplicación de pagos","Revisión de antigüedad","Cobros"],stageStatus:[true,true,false,false],details:[{label:"Lote CxC",val:"AR-2025-0271"},{label:"Cuenta",val:"Grupo Meridian"},{label:"Monto en disputa",val:"$42,000"},{label:"Factura",val:"INV-2025-0744"},{label:"Motivo de disputa",val:"Calidad del servicio"},{label:"Días pendientes",val:"45"}],chat:[{from:"agent",name:"Nina",time:"10:30 AM",msg:"Disputa formal recibida de Grupo Meridian para INV-2025-0744 ($42,000) — citando problemas de calidad de servicio en la entrega del 1 de julio. Factura puesta en espera por disputa."},{from:"user",name:"Carlos Aguilar",time:"10:45 AM",msg:"¿Qué documentación tenemos sobre esa entrega?"},{from:"agent",name:"Nina",time:"10:46 AM",msg:"Confirmación de entrega del 1 de julio, firmada por J. Hartman en Meridian. Formulario de reconocimiento de satisfacción en archivo. Compilando paquete de respuesta a disputa."},{from:"user",name:"Carlos Aguilar",time:"11:00 AM",msg:"Envía el paquete a Meridian y cópiame."},{from:"agent",name:"Nina",time:"11:01 AM",msg:"Paquete enviado al contacto de AP de Meridian y copiado a ti. Reloj de resolución de 15 días iniciado — escalación automática a cobros si no hay respuesta antes del 30 de julio."}]},
        ]
      },
    },
  },
};

// ─── AREA STRUCTURE ──────────────────────────────────────────────────────────
const areaBase = [
  { id:"h2r", color:"#7c3aed", light:"#f5f3ff", border:"#c4b5fd",
    agents:[{name:"Fer",icon:"JP"},{name:"Lucas",icon:"RC"},{name:"Isa",icon:"OB"},{name:"Ben",icon:"PM"},{name:"Lily",icon:"CP"},{name:"Lisa",icon:"TE"},{name:"Cleo",icon:"SR"}]
  },
  { id:"p2p", color:"#6d28d9", light:"#f5f0ff", border:"#c4b5fd",
    agents:[{name:"Alice",icon:"DP"},{name:"Jessica",icon:"SS"},{name:"Elsa",icon:"SO"},{name:"Olivia",icon:"PO"},{name:"Chris",icon:"GR"},{name:"Tony",icon:"IM"},{name:"Ryan",icon:"RM"},{name:"Daniel",icon:"IP"},{name:"David",icon:"PP"}]
  },
  { id:"o2c", color:"#4338ca", light:"#eef2ff", border:"#a5b4fc",
    agents:[{name:"Nico",icon:"OP"},{name:"Diana",icon:"DL"},{name:"James",icon:"TP"},{name:"Julia",icon:"OL"},{name:"Ryan",icon:"RT"},{name:"Mia",icon:"CM"},{name:"Alice",icon:"SM"},{name:"Nina",icon:"AR"}]
  },
];

const areaIcons = {
  h2r:(<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.6"/><path d="M3.5 23c0-5.247 4.253-9.5 9.5-9.5s9.5 4.253 9.5 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  p2p:(<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="7" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="15" y="11" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M11 11h4M11 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  o2c:(<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M5 7h16M5 7l2-3M21 7l-2-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><rect x="3" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M9 14l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
};

function getAreas(t) {
  return areaBase.map(a => ({
    ...a,
    label: a.id.toUpperCase(),
    full: t.areaFulls[a.id],
    desc: t.areaDescs[a.id],
    agents: a.agents.map(ag => ({
      ...ag,
      ...t.agentDetails[ag.name],
    }))
  }));
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────
function LiveActiveBadge({ t }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#dcfce7", color:"#166534", borderRadius:10, padding:"3px 10px", fontSize:11, fontWeight:500 }}>
      <span style={{ position:"relative", display:"inline-flex", width:8, height:8 }}>
        <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#22c55e", animation:"live-ping 1.4s ease-out infinite", opacity:0.6 }}></span>
        <span style={{ position:"relative", width:8, height:8, borderRadius:"50%", background:"#16a34a", display:"inline-block" }}></span>
      </span>
      {t.active}
    </span>
  );
}

function AgentDetail({ agent:a, area, onBack, onHome, t }) {
  var c = area.color;
  function Row({ label, items }) {
    return (
      <div style={{ background:"#f9fafb", borderRadius:8, padding:"14px 16px" }}>
        <div style={{ fontSize:10, fontWeight:500, color:"#9ca3af", letterSpacing:"0.08em", marginBottom:8 }}>{label}</div>
        {items.map((x,i) => (
          <div key={i} style={{ display:"flex", gap:8, marginBottom:5, alignItems:"flex-start" }}>
            <span style={{ color:c, fontSize:12, flexShrink:0, marginTop:2 }}>›</span>
            <span style={{ fontSize:13, color:"#111827", lineHeight:1.5 }}>{x}</span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ padding:"24px 28px", maxWidth:860, margin:"0 auto" }}>
      <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:12, overflow:"hidden" }}>
        <div style={{ background:c, padding:"22px 26px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16 }}>
          <div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.6)", fontWeight:500, letterSpacing:"0.1em", marginBottom:4 }}>{area.label} · {area.full.toUpperCase()} · {t.capabilitySheet}</div>
            <div style={{ fontSize:22, fontWeight:500, color:"#fff", marginBottom:4 }}>{a.module}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.75)" }}>{t.agentLabel}: <strong style={{color:"#fff"}}>{a.name}</strong> &nbsp;·&nbsp; {t.trigger}: {a.trigger}</div>
          </div>
          <span style={{ background:"rgba(255,255,255,0.2)", color:"#fff", borderRadius:6, padding:"4px 12px", fontSize:11, fontWeight:500, flexShrink:0 }}>{t.productionReady}</span>
        </div>
        <div style={{ padding:"22px 26px", display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:area.light, borderLeft:"3px solid "+c, borderRadius:"0 8px 8px 0", padding:"14px 16px" }}>
            <div style={{ fontSize:10, fontWeight:500, color:c, letterSpacing:"0.08em", marginBottom:6 }}>{t.whatItDoes}</div>
            <p style={{ margin:0, fontSize:13, color:"#111827", lineHeight:1.65 }}>{a.what}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <div style={{ background:area.light, borderRadius:8, padding:"14px 16px" }}>
              <div style={{ fontSize:10, fontWeight:500, color:c, letterSpacing:"0.08em", marginBottom:6 }}>{t.businessProblem}</div>
              <p style={{ margin:0, fontSize:13, color:"#111827", lineHeight:1.65 }}>{a.problem}</p>
            </div>
            <div style={{ background:area.light, borderRadius:8, padding:"14px 16px" }}>
              <div style={{ fontSize:10, fontWeight:500, color:c, letterSpacing:"0.08em", marginBottom:8 }}>{t.idealUser}</div>
              {a.users.map((u,i) => (
                <div key={i} style={{ display:"flex", gap:8, marginBottom:5, alignItems:"flex-start" }}>
                  <span style={{ color:c, fontSize:12, flexShrink:0, marginTop:2 }}>›</span>
                  <span style={{ fontSize:13, color:"#111827", lineHeight:1.5 }}>{u}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:"#f9fafb", borderRadius:8, padding:"14px 16px" }}>
            <div style={{ fontSize:10, fontWeight:500, color:"#9ca3af", letterSpacing:"0.08em", marginBottom:8 }}>{t.keyFeatures}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 24px" }}>
              {a.capabilities.map((x,i) => (
                <div key={i} style={{ display:"flex", gap:8, marginBottom:5, alignItems:"flex-start" }}>
                  <span style={{ color:c, fontSize:12, flexShrink:0, marginTop:2 }}>›</span>
                  <span style={{ fontSize:13, color:"#111827", lineHeight:1.5 }}>{x}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <Row label={t.inputsRequired} items={a.inputs} />
            <Row label={t.outputsDeliverables} items={a.outputs} />
          </div>
          <div style={{ background:"#f0fdf4", border:"0.5px solid #bbf7d0", borderRadius:8, padding:"14px 16px" }}>
            <div style={{ fontSize:10, fontWeight:500, color:"#16a34a", letterSpacing:"0.08em", marginBottom:6 }}>{t.maturityReadiness}</div>
            <p style={{ margin:0, fontSize:13, color:"#111827", lineHeight:1.65 }}>{a.maturity}</p>
          </div>
          <div style={{ background:"#fff7ed", border:"0.5px solid #fed7aa", borderRadius:8, padding:"14px 16px" }}>
            <div style={{ fontSize:10, fontWeight:500, color:"#c2410c", letterSpacing:"0.08em", marginBottom:8 }}>{t.limitations}</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 24px" }}>
              {a.limits.map((x,i) => (
                <div key={i} style={{ display:"flex", gap:8, marginBottom:5, alignItems:"flex-start" }}>
                  <span style={{ color:"#c2410c", fontSize:12, flexShrink:0, marginTop:2 }}>›</span>
                  <span style={{ fontSize:13, color:"#111827", lineHeight:1.5 }}>{x}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", gap:8, paddingTop:4 }}>
            <button onClick={onBack} style={{ fontSize:12, padding:"7px 16px", borderRadius:6, border:"0.5px solid "+area.border, color:c, cursor:"pointer", background:"#fff" }}>{t.backTo} {area.label} {t.agents}</button>
            <button onClick={onHome} style={{ fontSize:12, padding:"7px 16px", borderRadius:6, border:"0.5px solid #e5e7eb", color:"#6b7280", cursor:"pointer", background:"#fff" }}>{t.home}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RunDetail({ run, agent:ag, onBack, t }) {
  var c = ag.color;
  var [msgs, setMsgs] = useState([]);
  var [input, setInput] = useState("");
  function sendMsg() {
    if (!input.trim()) return;
    var nm = msgs.concat([{from:"user",name:"You",time:"now",msg:input}]);
    setMsgs(nm); setInput("");
    setTimeout(() => setMsgs(nm.concat([{from:"agent",name:ag.name,time:"now",msg:t.agentReply(run.ref)}])), 800);
  }
  var allMsgs = run.chat.concat(msgs);
  return (
    <div style={{ padding:"0 32px 32px", maxWidth:960, margin:"0 auto" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"20px 0 16px" }}>
        <button onClick={onBack} style={{ fontSize:12, padding:"6px 12px", borderRadius:6, border:"0.5px solid #e5e7eb", color:"#6b7280", cursor:"pointer", background:"#fff", display:"flex", alignItems:"center", gap:5 }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 10.5L4.5 7 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {t.backTo} {ag.name}
        </button>
        <span style={{ fontSize:11, color:"#9ca3af" }}>›</span>
        <span style={{ fontSize:12, color:c, fontWeight:500 }}>{run.ref}</span>
        <span style={{ fontSize:11, color:"#9ca3af" }}>· {run.desc}</span>
      </div>
      <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"18px 20px", marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:500, color:"#111827", marginBottom:14 }}>{t.transactionDetails}</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px 24px" }}>
          {run.details.map((d,i) => (
            <div key={i}><div style={{ fontSize:11, color:"#9ca3af", marginBottom:2 }}>{d.label}</div><div style={{ fontSize:13, color:"#111827", fontWeight:500 }}>{d.val}</div></div>
          ))}
        </div>
      </div>
      <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"18px 20px", marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:500, color:"#111827", marginBottom:20 }}>{t.processingTimeline}</div>
        <div style={{ display:"flex", alignItems:"flex-start", padding:"0 20px" }}>
          {run.stages.map((st,i) => {
            var done = run.stageStatus[i];
            var active = !done && (i===0 || run.stageStatus[i-1]);
            var bg = done ? c : active ? "#f59e0b" : "#e5e7eb";
            var textC = done ? c : active ? "#92400e" : "#9ca3af";
            return (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }}>
                {i < run.stages.length-1 && <div style={{ position:"absolute", top:16, left:"50%", width:"100%", height:2, background: done ? c+"55":"#e5e7eb", zIndex:0 }}></div>}
                <div className={active?"thinking-dot":""} style={{ width:32, height:32, borderRadius:"50%", background: done?c+"18":active?"#fef3c7":"#f9fafb", border:"2px solid "+bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:1, marginBottom:8 }}>
                  {done ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        : <div style={{ width:8, height:8, borderRadius:"50%", background:bg }}></div>}
                </div>
                <div style={{ fontSize:11, fontWeight:500, color:textC, textAlign:"center", maxWidth:100 }}>{st}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, overflow:"hidden" }}>
        <div style={{ padding:"14px 20px", borderBottom:"0.5px solid #e5e7eb" }}>
          <div style={{ fontSize:13, fontWeight:500, color:"#111827" }}>{t.conversation}</div>
          <div style={{ fontSize:11, color:"#9ca3af" }}>{t.conversationSub(ag.name)}</div>
        </div>
        <div style={{ padding:"16px 20px", display:"flex", flexDirection:"column", gap:14, minHeight:240 }}>
          {allMsgs.map((m,i) => {
            var isAgent = m.from==="agent";
            return (
              <div key={i} style={{ display:"flex", flexDirection: isAgent?"row":"row-reverse", gap:10, alignItems:"flex-end" }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background: isAgent?c:"#6b7280", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:11, fontWeight:500, color:"#fff" }}>{isAgent?ag.initials:"U"}</span>
                </div>
                <div style={{ maxWidth:"68%" }}>
                  <div style={{ fontSize:10, color:"#9ca3af", marginBottom:3, textAlign: isAgent?"left":"right" }}>{m.name} · {m.time}</div>
                  <div style={{ background: isAgent?ag.light:"#f3f4f6", borderRadius: isAgent?"0 10px 10px 10px":"10px 0 10px 10px", padding:"10px 14px", fontSize:13, color:"#111827", lineHeight:1.5 }}>{m.msg}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ padding:"12px 16px", borderTop:"0.5px solid #e5e7eb", display:"flex", gap:8 }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")sendMsg();}}
            placeholder={t.messagePlaceholder(ag.name)} style={{ flex:1, fontSize:13, padding:"8px 12px", borderRadius:8, border:"0.5px solid #d1d5db", background:"#f9fafb", color:"#111827", outline:"none" }} />
          <button onClick={sendMsg} style={{ padding:"8px 16px", borderRadius:8, background:c, border:"none", cursor:"pointer", color:"#fff", fontSize:12, fontWeight:500 }}>{t.send}</button>
        </div>
      </div>
    </div>
  );
}

function AgentMonitor({ agent:ag, onBack, exceptionPages, setExceptionPages, t }) {
  var c = ag.color;
  var [selectedRun, setSelectedRun] = useState(null);
  var langKey = t === T.es ? "es" : "en";
  var runHistory = (T[langKey].runData[ag.name] || {}).runs || [];
  var allExceptions = T[langKey].exceptions[ag.name] || [];
  var excPageSize=3, excPage=exceptionPages[ag.name]||0;
  var excTotalPages=Math.ceil(allExceptions.length/excPageSize);
  var exceptions=allExceptions.slice(excPage*excPageSize,(excPage+1)*excPageSize);
  var stages = ag.name==="Isa" ? runHistory[0]?.stages||[] : ag.name==="Nina" ? runHistory[0]?.stages||[] : runHistory[0]?.stages||[];
  var stageCounts=[4,3,2,3];
  var statusColor=s=>{
    if(s==="Successful"||s==="Completed") return{bg:"#dcfce7",color:"#166534"};
    if(s==="In progress") return{bg:"#dbeafe",color:"#1e40af"};
    if(s==="In review") return{bg:"#fef3c7",color:"#92400e"};
    return{bg:"#f3f4f6",color:"#374151"};
  };
  if(selectedRun) return <RunDetail run={selectedRun} agent={ag} onBack={()=>setSelectedRun(null)} t={t}/>;
  return (
    <div style={{ padding:"0 32px 32px", maxWidth:960, margin:"0 auto" }}>
      <div style={{ padding:"20px 0 16px" }}>
        <button onClick={onBack} style={{ fontSize:12, padding:"6px 12px", borderRadius:6, border:"0.5px solid #e5e7eb", color:"#6b7280", cursor:"pointer", background:"#fff", display:"inline-flex", alignItems:"center", gap:5, marginBottom:14 }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 10.5L4.5 7 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {t.backToPlatform}
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:44, height:44, borderRadius:"50%", background:c, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontSize:14, fontWeight:500, color:"#fff" }}>{ag.initials}</span>
          </div>
          <div>
            <div style={{ fontSize:20, fontWeight:500, color:"#111827" }}>{ag.name}</div>
            <div style={{ fontSize:12, color:c }}>{ag.role}</div>
          </div>
          <LiveActiveBadge t={t}/>
          <span style={{ background:ag.light, color:c, borderRadius:6, padding:"3px 9px", fontSize:11, border:"0.5px solid "+ag.border }}>{ag.area}</span>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,minmax(0,1fr))", gap:12, marginBottom:20 }}>
        {ag.stats.map((s,i)=>(
          <div key={i} style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"16px", borderTop:"3px solid "+c }}>
            <div style={{ fontSize:11, color:"#9ca3af", marginBottom:4 }}>{s.label}</div>
            <div style={{ fontSize:22, fontWeight:500, color:c }}>{s.val}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:16, marginBottom:20 }}>
        <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"18px 20px" }}>
          <div style={{ fontSize:13, fontWeight:500, color:"#111827", marginBottom:4 }}>{t.processOverview}</div>
          <div style={{ fontSize:11, color:"#9ca3af", marginBottom:24 }}>{t.processOverviewSub}</div>
          <div style={{ display:"flex", alignItems:"flex-start", padding:"0 10px" }}>
            {stages.map((st,i)=>(
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }}>
                {i<stages.length-1&&<div style={{ position:"absolute",top:8,left:"50%",width:"100%",height:2,background:i<2?c+"55":"#e5e7eb",zIndex:0 }}></div>}
                <div style={{ width:18,height:18,borderRadius:"50%",background:i<3?c:c+"44",border:"2px solid #fff",position:"relative",zIndex:1,marginBottom:8 }}></div>
                <div style={{ fontSize:11,fontWeight:500,color:c,textAlign:"center",maxWidth:90 }}>{st}</div>
                <div style={{ fontSize:11,color:"#9ca3af",marginTop:2 }}>{stageCounts[i]} {t.requests}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"18px 20px" }}>
          <div style={{ fontSize:13, fontWeight:500, color:"#111827", marginBottom:4 }}>{t.recentExceptions}</div>
          <div style={{ fontSize:11, color:"#9ca3af", marginBottom:14 }}>{t.recentExceptionsSub}</div>
          {exceptions.map((ex,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"#f9fafb", borderRadius:8, marginBottom:8 }}>
              <div style={{ width:8,height:8,borderRadius:"50%",background:ex.severity==="high"?"#ef4444":"#f59e0b",flexShrink:0 }}></div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12,fontWeight:500,color:"#111827" }}>{ex.type}</div>
                <div style={{ fontSize:11,color:"#9ca3af" }}>{ex.ref}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          ))}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:8 }}>
            <span style={{ fontSize:11, color:"#9ca3af" }}>{t.pageOf(excPage+1,excTotalPages)}</span>
            <div style={{ display:"flex", gap:4 }}>
              <button onClick={()=>setExceptionPages(p=>({...p,[ag.name]:Math.max(0,excPage-1)}))} disabled={excPage===0}
                style={{ fontSize:11,padding:"3px 10px",borderRadius:5,border:"0.5px solid #e5e7eb",background:excPage===0?"#f9fafb":"#fff",color:excPage===0?"#d1d5db":c,cursor:excPage===0?"default":"pointer" }}>{t.prev}</button>
              <button onClick={()=>setExceptionPages(p=>({...p,[ag.name]:Math.min(excTotalPages-1,excPage+1)}))} disabled={excPage===excTotalPages-1}
                style={{ fontSize:11,padding:"3px 10px",borderRadius:5,border:"0.5px solid #e5e7eb",background:excPage===excTotalPages-1?"#f9fafb":"#fff",color:excPage===excTotalPages-1?"#d1d5db":c,cursor:excPage===excTotalPages-1?"default":"pointer" }}>{t.next}</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"18px 20px" }}>
        <div style={{ fontSize:13, fontWeight:500, color:"#111827", marginBottom:4 }}>{t.runHistory}</div>
        <div style={{ fontSize:11, color:"#9ca3af", marginBottom:16 }}>{t.runHistorySub}</div>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead>
            <tr style={{ borderBottom:"0.5px solid #e5e7eb" }}>
              {[t.executionStart,t.status,t.duration,t.description,t.reference].map(h=>(
                <th key={h} style={{ padding:"8px 12px",textAlign:"left",fontSize:11,fontWeight:500,color:"#9ca3af",letterSpacing:"0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {runHistory.map((r,i)=>{
              var sc=statusColor(r.status);
              var displayStatus = t.statusLabels[r.status]||r.status;
              return (
                <tr key={i} onClick={()=>setSelectedRun(r)} style={{ borderBottom:"0.5px solid #e5e7eb",cursor:"pointer" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#f9fafb"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                  <td style={{ padding:"12px 12px",color:"#6b7280",whiteSpace:"nowrap" }}>{r.date}</td>
                  <td style={{ padding:"12px 12px" }}><span style={{ background:sc.bg,color:sc.color,borderRadius:10,padding:"3px 10px",fontSize:11,fontWeight:500 }}>{displayStatus}</span></td>
                  <td style={{ padding:"12px 12px",color:"#6b7280" }}>{r.duration}</td>
                  <td style={{ padding:"12px 12px",color:"#111827" }}>{r.desc}</td>
                  <td style={{ padding:"12px 12px" }}>
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                      <span style={{ color:c,fontWeight:500 }}>{r.ref}</span>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M4.5 2.5L8 6.5 4.5 10.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChartRenderer({ lang }) {
  useEffect(()=>{
    var s=document.createElement("script");
    s.src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    s.onload=()=>{
      var C=window.Chart, g="rgba(150,150,150,0.12)", tc="#9ca3af";
      var tl=T[lang].chartLabels;
      ["cycleChart","savingsChart","roiChart"].forEach(id=>{
        var el=document.getElementById(id);
        if(el&&el._ci){el._ci.destroy();el._ci=null;el._done=false;}
      });
      var e1=document.getElementById("cycleChart");
      if(e1&&!e1._done){e1._done=true;e1._ci=new C(e1,{type:"bar",data:{labels:tl.cycleItems,datasets:[{label:T[lang].manual,data:[3.2,2.8,6.4,4.1],backgroundColor:"#d1d5db",borderRadius:3},{label:T[lang].automated,data:[0.17,0.48,2.1,0.9],backgroundColor:"#7c3aed",borderRadius:3}]},options:{indexAxis:"y",responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:g},ticks:{color:tc,font:{size:11},callback:v=>v+"d"}},y:{grid:{display:false},ticks:{color:tc,font:{size:11}}}}}})}
      var e2=document.getElementById("savingsChart");
      if(e2&&!e2._done){e2._done=true;e2._ci=new C(e2,{type:"bar",data:{labels:["H2R","P2P","O2C"],datasets:[{data:[620,1100,680],backgroundColor:["#7c3aed","#6d28d9","#4338ca"],borderRadius:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:tc,font:{size:12}}},y:{grid:{color:g},ticks:{color:tc,font:{size:11},callback:v=>"$"+v+"K"}}}}})}
      var e3=document.getElementById("roiChart");
      if(e3&&!e3._done){e3._done=true;e3._ci=new C(e3,{type:"line",data:{labels:tl.months,datasets:[{data:[0.2,0.4,0.7,1.0,1.3,1.7,2.1,2.5,2.9,3.2,3.5,3.8],borderColor:"#4338ca",backgroundColor:"rgba(67,56,202,0.08)",fill:true,tension:0.4,pointRadius:3,pointBackgroundColor:"#4338ca"}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:g},ticks:{color:tc,font:{size:11}}},y:{min:0,grid:{color:g},ticks:{color:tc,font:{size:11},callback:v=>v+"x"}}}}})}
    };
    document.head.appendChild(s);
    return ()=>{if(document.head.contains(s))document.head.removeChild(s);};
  },[lang]);
  return null;
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  var [mainTab,setMainTab]=useState("catalog");
  var [previewView,setPreviewView]=useState("overview");
  var [selectedAgent,setSelectedAgent]=useState(null);
  var [view,setView]=useState("home");
  var [activeArea,setActiveArea]=useState(null);
  var [activeAgent,setActiveAgent]=useState(null);
  var [exceptionPages,setExceptionPages]=useState({});
  var [lang,setLang]=useState("en");
  var t=T[lang];
  var areas=getAreas(t);

  function goHome(){setView("home");setActiveArea(null);setActiveAgent(null);}
  function goArea(a){setActiveArea(a);setActiveAgent(null);setView("area");}
  function goAgent(a){setActiveAgent(a);setView("agent");}

  var purple="#7c3aed";
  var sampleAgents=[
    {name:"Daniel",role:T[lang].agentDetails.Daniel.module,area:"P2P",color:"#6d28d9",light:"#f5f0ff",border:"#c4b5fd",initials:"DA",
     stats:[{label:lang==="es"?"Procesando ahora":"Processing now",val:"15"},{label:lang==="es"?"Total procesado":"Total processed",val:"248"},{label:lang==="es"?"Precisión":"Accuracy",val:"99.8%"},{label:lang==="es"?"Tiempo prom.":"Avg time",val:"30s"}],exceptions:2},
    {name:"Isa",role:T[lang].agentDetails.Isa.module,area:"H2R",color:"#7c3aed",light:"#f5f3ff",border:"#c4b5fd",initials:"IS",
     stats:[{label:lang==="es"?"Incorporaciones activas":"Active onboardings",val:"7"},{label:lang==="es"?"Completados este mes":"Completed this mo.",val:"34"},{label:lang==="es"?"Tasa a tiempo":"On-time rate",val:"97.1%"},{label:lang==="es"?"Tiempo prom.":"Avg time",val:"2.1d"}],exceptions:1},
    {name:"Nina",role:T[lang].agentDetails.Nina.module,area:"O2C",color:"#4338ca",light:"#eef2ff",border:"#a5b4fc",initials:"NI",
     stats:[{label:lang==="es"?"Facturas abiertas":"Open invoices",val:"42"},{label:lang==="es"?"Cobrado este mes":"Collected this mo.",val:"$1.2M"},{label:lang==="es"?"DSO":"DSO",val:"18d"},{label:lang==="es"?"Alertas vencidas":"Overdue flags",val:"3"}],exceptions:3},
  ];

  return (
    <div style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", minHeight:"100vh", background:"#f3f4f6" }}>
      <style>{`
        @keyframes live-ping{0%{transform:scale(1);opacity:0.6;}100%{transform:scale(2.2);opacity:0;}}
        @keyframes pulse-ring{0%{box-shadow:0 0 0 0 rgba(245,158,11,0.5);}70%{box-shadow:0 0 0 7px rgba(245,158,11,0);}100%{box-shadow:0 0 0 0 rgba(245,158,11,0);}}
        .thinking-dot{animation:pulse-ring 1.4s ease-out infinite;}
      `}</style>

      {/* NAV */}
      <div style={{ background:"#fff", borderBottom:"0.5px solid #e5e7eb", padding:"0 24px", display:"flex", alignItems:"center", height:52 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"0 16px 0 0", borderRight:"0.5px solid #e5e7eb", marginRight:16, flexShrink:0 }}>
          <div style={{ width:26,height:26,background:"linear-gradient(135deg,#7c3aed,#4338ca)",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center" }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="4" height="4" rx="1" fill="white"/><rect x="8" y="1" width="4" height="4" rx="1" fill="white"/><rect x="1" y="8" width="4" height="4" rx="1" fill="white"/><rect x="8" y="8" width="4" height="4" rx="1" fill="white"/></svg>
          </div>
          <span style={{ fontSize:13, fontWeight:500, color:"#111827" }}>{t.appName}</span>
        </div>
        <div style={{ display:"flex", gap:0, height:"100%" }}>
          {[["catalog",t.catalogTab],["preview",t.dashboardTab]].map(([key,label])=>{
            var active=mainTab===key;
            return <button key={key} onClick={()=>{setMainTab(key);if(key==="catalog")goHome();}} style={{ height:"100%",padding:"0 18px",background:"none",border:"none",borderBottom:active?"2px solid "+purple:"2px solid transparent",cursor:"pointer",fontSize:13,fontWeight:active?500:400,color:active?purple:"#6b7280",transition:"all 0.15s" }}>{label}</button>;
          })}
        </div>
        {mainTab==="catalog"&&(
          <div style={{ marginLeft:"auto", display:"flex", gap:8, alignItems:"center" }}>
            {activeArea&&(
              <span style={{ fontSize:12, color:"#9ca3af", marginRight:4 }}>
                <button onClick={goHome} style={{ background:"none",border:"none",cursor:"pointer",fontSize:12,color:"#6b7280",padding:0 }}>{t.home}</button>
                {" › "}
                <button onClick={()=>goArea(activeArea)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:12,color:activeArea.color,padding:0 }}>{activeArea.label}</button>
                {view==="agent"&&activeAgent?" › "+activeAgent.name:""}
              </span>
            )}
            {areas.map(a=>(
              <button key={a.id} onClick={()=>goArea(a)} style={{ background:activeArea&&activeArea.id===a.id?a.color+"18":"none",border:"0.5px solid",borderColor:activeArea&&activeArea.id===a.id?a.border:"#e5e7eb",borderRadius:6,cursor:"pointer",padding:"4px 12px",fontSize:12,fontWeight:500,color:activeArea&&activeArea.id===a.id?a.color:"#6b7280" }}>{a.label}</button>
            ))}
          </div>
        )}
        {mainTab!=="catalog"&&<div style={{ flex:1 }}/>}
        <div style={{ marginLeft:12, flexShrink:0 }}>
          <div style={{ display:"flex", gap:4 }}>
            {["en","es"].map(l => (
              <button key={l} onClick={()=>setLang(l)}
                style={{ fontSize:11, fontWeight:600, padding:"5px 10px", borderRadius:6, border:"0.5px solid #e5e7eb", background:lang===l?"#7c3aed":"#fff", color:lang===l?"#fff":"#374151", cursor:"pointer", transition:"all 0.2s" }}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CATALOG */}
      {mainTab==="catalog"&&(
        <div>
          {view==="home"&&(
            <div style={{ padding:"40px 32px", maxWidth:960, margin:"0 auto" }}>
              <div style={{ marginBottom:28 }}>
                <div style={{ fontSize:11,fontWeight:500,color:"#9ca3af",letterSpacing:"0.08em",marginBottom:6 }}>BEECKER AUTONOMOUS AGENTS</div>
                <h1 style={{ margin:"0 0 8px",fontSize:26,fontWeight:500,color:"#111827" }}>{t.catalogTitle}</h1>
                <p style={{ margin:0,fontSize:14,color:"#6b7280",maxWidth:520 }}>{t.catalogSub}</p>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>
                {areas.map(a=>(
                  <button key={a.id} onClick={()=>goArea(a)} style={{ background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:12,padding:"24px 20px",textAlign:"left",cursor:"pointer" }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor=a.border} onMouseLeave={e=>e.currentTarget.style.borderColor="#e5e7eb"}>
                    <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16 }}>
                      <div style={{ color:a.color,background:a.light,borderRadius:10,width:46,height:46,display:"flex",alignItems:"center",justifyContent:"center" }}>{areaIcons[a.id]}</div>
                      <span style={{ background:a.light,color:a.color,borderRadius:6,padding:"3px 10px",fontSize:11,fontWeight:500 }}>{a.agents.length} {t.agents}</span>
                    </div>
                    <div style={{ fontSize:17,fontWeight:500,color:"#111827",marginBottom:3 }}>{a.label}</div>
                    <div style={{ fontSize:12,color:a.color,marginBottom:8 }}>{a.full}</div>
                    <p style={{ margin:"0 0 14px",fontSize:13,color:"#6b7280",lineHeight:1.55 }}>{a.desc}</p>
                    <div style={{ display:"flex",flexWrap:"wrap",gap:4 }}>
                      {a.agents.slice(0,4).map(ag=><span key={ag.name} style={{ background:"#f9fafb",border:"0.5px solid #e5e7eb",borderRadius:5,padding:"2px 8px",fontSize:11,color:"#6b7280" }}>{ag.name}</span>)}
                      {a.agents.length>4&&<span style={{ fontSize:11,color:"#9ca3af",padding:"2px 4px" }}>{t.moreAgents(a.agents.length-4)}</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {view==="area"&&activeArea&&(
            <div style={{ padding:"28px 32px",maxWidth:980,margin:"0 auto" }}>
              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:8 }}>
                <div style={{ color:activeArea.color,background:activeArea.light,borderRadius:10,width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center" }}>{areaIcons[activeArea.id]}</div>
                <div>
                  <div style={{ fontSize:10,color:"#9ca3af",fontWeight:500,letterSpacing:"0.07em" }}>{activeArea.label}</div>
                  <h2 style={{ margin:0,fontSize:19,fontWeight:500,color:"#111827" }}>{activeArea.full}</h2>
                </div>
              </div>
              <p style={{ margin:"0 0 22px",fontSize:13,color:"#6b7280" }}>{activeArea.desc} {t.clickForCapability}</p>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))",gap:12 }}>
                {activeArea.agents.map(ag=>(
                  <button key={ag.name} onClick={()=>goAgent(ag)} style={{ background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:12,padding:"16px 14px",textAlign:"left",cursor:"pointer" }}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=activeArea.border;e.currentTarget.style.background=activeArea.light;}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#e5e7eb";e.currentTarget.style.background="#fff";}}>
                    <div style={{ width:34,height:34,background:activeArea.color+"18",borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10 }}>
                      <span style={{ fontSize:11,fontWeight:500,color:activeArea.color }}>{ag.icon}</span>
                    </div>
                    <div style={{ fontSize:14,fontWeight:500,color:"#111827",marginBottom:2 }}>{ag.name}</div>
                    <div style={{ fontSize:11,color:activeArea.color,marginBottom:6 }}>{ag.module}</div>
                    <div style={{ fontSize:10,color:"#9ca3af",lineHeight:1.4 }}>{t.trigger}: {ag.trigger}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {view==="agent"&&activeAgent&&activeArea&&(()=>{
            // Always re-derive agent content from current language so switching lang updates the page
            var liveArea = areas.find(a=>a.id===activeArea.id)||activeArea;
            var liveAgent = liveArea.agents.find(a=>a.name===activeAgent.name)||activeAgent;
            return <AgentDetail agent={liveAgent} area={liveArea} onBack={()=>goArea(liveArea)} onHome={goHome} t={t}/>;
          })()}
        </div>
      )}

      {/* DASHBOARD */}
      {mainTab==="preview"&&previewView==="overview"&&(
        <div style={{ padding:"40px 32px",maxWidth:960,margin:"0 auto" }}>
          <div style={{ marginBottom:28 }}>
            <div style={{ fontSize:11,fontWeight:500,color:"#9ca3af",letterSpacing:"0.08em",marginBottom:6 }}>BEECKER AUTONOMOUS AGENTS</div>
            <h1 style={{ margin:"0 0 8px",fontSize:26,fontWeight:500,color:"#111827" }}>{t.dashboardTitle}</h1>
            <p style={{ margin:0,fontSize:14,color:"#6b7280",maxWidth:520 }}>{t.dashboardSub}</p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:28 }}>
            {[
              {id:"cycleChart",title:t.cycleTimeTitle,sub:t.cycleTimeSub,legend:[{color:"#d1d5db",label:t.manual},{color:"#7c3aed",label:t.automated}]},
              {id:"savingsChart",title:t.savingsTitle,sub:t.savingsSub,legend:[{color:"#7c3aed",label:"H2R"},{color:"#6d28d9",label:"P2P"},{color:"#4338ca",label:"O2C"}]},
              {id:"roiChart",title:t.roiTitle,sub:t.roiSub,legend:[{color:"#4338ca",label:"ROI (x)"}]},
            ].map(ch=>(
              <div key={ch.id} style={{ background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"16px" }}>
                <div style={{ fontSize:12,fontWeight:500,color:"#111827",marginBottom:2 }}>{ch.title}</div>
                <div style={{ fontSize:11,color:"#9ca3af",marginBottom:10 }}>{ch.sub}</div>
                <div style={{ display:"flex",gap:12,marginBottom:10 }}>
                  {ch.legend.map(l=><span key={l.label} style={{ display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#6b7280" }}><span style={{ width:10,height:10,borderRadius:2,background:l.color,display:"inline-block" }}></span>{l.label}</span>)}
                </div>
                <div style={{ position:"relative",width:"100%",height:180 }}><canvas id={ch.id}></canvas></div>
              </div>
            ))}
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:16,marginBottom:36 }}>
            {t.kpis.map((k,i)=>{
              var colors=["#7c3aed","#6d28d9","#4338ca","#4338ca"];
              return (
                <div key={i} style={{ background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:10,padding:"16px 16px 14px",borderTop:"3px solid "+colors[i] }}>
                  <div style={{ fontSize:24,fontWeight:500,color:colors[i],marginBottom:4 }}>{k.value}</div>
                  <div style={{ fontSize:12,color:"#111827",lineHeight:1.45,marginBottom:5 }}>{k.label}</div>
                  <div style={{ fontSize:11,color:"#9ca3af" }}>{k.sub}</div>
                </div>
              );
            })}
          </div>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11,fontWeight:500,color:"#9ca3af",letterSpacing:"0.08em",marginBottom:4 }}>{t.sampleAgentsLabel}</div>
            <p style={{ margin:"0 0 16px",fontSize:13,color:"#6b7280" }}>{t.sampleAgentsSub}</p>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16 }}>
            {sampleAgents.map(ag=>(
              <button key={ag.name} onClick={()=>{setSelectedAgent(ag);setPreviewView("agent");}} style={{ background:"#fff",border:"0.5px solid #e5e7eb",borderRadius:12,padding:0,textAlign:"left",cursor:"pointer",overflow:"hidden",display:"flex",flexDirection:"column" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=ag.border} onMouseLeave={e=>e.currentTarget.style.borderColor="#e5e7eb"}>
                <div style={{ background:ag.light,padding:"16px 18px",display:"flex",alignItems:"center",gap:12,borderBottom:"0.5px solid #e5e7eb",width:"100%",boxSizing:"border-box" }}>
                  <div style={{ width:44,height:44,borderRadius:"50%",background:ag.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                    <span style={{ fontSize:14,fontWeight:500,color:"#fff" }}>{ag.initials}</span>
                  </div>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontSize:15,fontWeight:500,color:"#111827" }}>{ag.name}</div>
                    <div style={{ fontSize:11,color:ag.color }}>{ag.role}</div>
                  </div>
                  <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4 }}>
                    <LiveActiveBadge t={t}/>
                    <span style={{ background:ag.light,color:ag.color,borderRadius:6,padding:"2px 7px",fontSize:10,border:"0.5px solid "+ag.border }}>{ag.area}</span>
                  </div>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,flex:1 }}>
                  {ag.stats.map((s,i)=>(
                    <div key={i} style={{ padding:"12px 16px",borderRight:i%2===0?"0.5px solid #e5e7eb":"none",borderBottom:i<2?"0.5px solid #e5e7eb":"none" }}>
                      <div style={{ fontSize:10,color:"#9ca3af",marginBottom:3 }}>{s.label}</div>
                      <div style={{ fontSize:16,fontWeight:500,color:ag.color }}>{s.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding:"10px 18px",borderTop:"0.5px solid #e5e7eb",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                  <span style={{ fontSize:11,color:"#9ca3af" }}>{t.exceptionsPending(ag.exceptions)}</span>
                  <span style={{ fontSize:11,color:ag.color,fontWeight:500 }}>{t.viewDashboard}</span>
                </div>
              </button>
            ))}
          </div>
          <ChartRenderer lang={lang}/>
        </div>
      )}
      {mainTab==="preview"&&previewView==="agent"&&selectedAgent&&(
        <AgentMonitor agent={selectedAgent} onBack={()=>setPreviewView("overview")} exceptionPages={exceptionPages} setExceptionPages={setExceptionPages} t={t}/>
      )}
    </div>
  );
}
