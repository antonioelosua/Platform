"use client"

import { useState, useEffect } from "react";

function ChartRenderer() {
  useEffect(function() {
    var s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
    s.onload = function() {
      var C = window.Chart;
      var g = "rgba(150,150,150,0.12)";
      var t = "#9ca3af";
      var el1 = document.getElementById("cycleChart");
      if (el1 && !el1._done) {
        el1._done = true;
        new C(el1, {
          type: "bar",
          data: {
            labels: ["Invoice", "PO creation", "Onboarding", "Travel claim"],
            datasets: [
              { label: "Manual", data: [3.2, 2.8, 6.4, 4.1], backgroundColor: "#d1d5db", borderRadius: 3 },
              { label: "Automated", data: [0.17, 0.48, 2.1, 0.9], backgroundColor: "#7c3aed", borderRadius: 3 }
            ]
          },
          options: {
            indexAxis: "y", responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: g }, ticks: { color: t, font: { size: 11 }, callback: function(v) { return v + "d"; } } },
              y: { grid: { display: false }, ticks: { color: t, font: { size: 11 } } }
            }
          }
        });
      }
      var el2 = document.getElementById("savingsChart");
      if (el2 && !el2._done) {
        el2._done = true;
        new C(el2, {
          type: "bar",
          data: {
            labels: ["H2R", "P2P", "O2C"],
            datasets: [{ data: [620, 1100, 680], backgroundColor: ["#7c3aed", "#6d28d9", "#4338ca"], borderRadius: 4 }]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { display: false }, ticks: { color: t, font: { size: 12 } } },
              y: { grid: { color: g }, ticks: { color: t, font: { size: 11 }, callback: function(v) { return "$" + v + "K"; } } }
            }
          }
        });
      }
      var el3 = document.getElementById("roiChart");
      if (el3 && !el3._done) {
        el3._done = true;
        new C(el3, {
          type: "line",
          data: {
            labels: ["M1","M2","M3","M4","M5","M6","M7","M8","M9","M10","M11","M12"],
            datasets: [{
              data: [0.2, 0.4, 0.7, 1.0, 1.3, 1.7, 2.1, 2.5, 2.9, 3.2, 3.5, 3.8],
              borderColor: "#4338ca", backgroundColor: "rgba(67,56,202,0.08)",
              fill: true, tension: 0.4, pointRadius: 3, pointBackgroundColor: "#4338ca"
            }]
          },
          options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: g }, ticks: { color: t, font: { size: 11 } } },
              y: { min: 0, grid: { color: g }, ticks: { color: t, font: { size: 11 }, callback: function(v) { return v + "x"; } } }
            }
          }
        });
      }
    };
    document.head.appendChild(s);
    return function() { if (document.head.contains(s)) document.head.removeChild(s); };
  }, []);
  return null;
}

const areas = [
  {
    id:"h2r",label:"H2R",full:"Hire-to-Retire",color:"#7c3aed",light:"#f5f3ff",border:"#c4b5fd",
    desc:"End-to-end HR lifecycle automation from job opening planning through retirement processing.",
    agents:[
      {name:"Fer",icon:"JP",module:"Job Opening Planning",trigger:"New Job Opening Detected",
       what:"Detects job opening signals from workforce data, org changes, or attrition events and automatically initiates requisition workflows, routing them to the appropriate approvers with pre-populated job data.",
       problem:"Eliminates manual tracking of open positions and lag time between job opening identification and requisition creation, reducing time-to-hire initiation.",
       users:["HR business partners","Workforce planners","HR operations staff","CHCO office support"],
       capabilities:["Monitors workforce data streams for job opening signals","Auto-populates requisition with position classification data","Routes draft requisition to designated approvers","Logs trigger event with timestamp and source","Integrates with HRIS and position management systems"],
       inputs:["Workforce planning data","Org structure records","Attrition / separation notices","Position classification data","Approval routing rules"],
       outputs:["Initiated requisition record","Routing notification to approvers","Position data pre-fill","Audit log of trigger event"],
       maturity:"Production-ready. Repeatable deployment pattern for HRIS-integrated environments.",
       limits:["Requires clean position data to pre-populate accurately","Job opening signals depend on upstream HR system data quality","Does not make hiring decisions","Requires HRIS integration and approval routing configuration"]},
      {name:"Lucas",icon:"RC",module:"Recruitment",trigger:"New Application Received",
       what:"Processes incoming applications, screens candidates against defined criteria, organizes applicant data, and routes qualified candidates to human reviewers with structured summaries.",
       problem:"Reduces the burden of manual application screening in high-volume hiring, ensuring consistent criteria application and faster movement of qualified candidates to human decision-makers.",
       users:["HR specialists","Hiring managers","EEO officers","Talent acquisition teams"],
       capabilities:["Ingests and normalizes applications from multiple channels","Applies defined screening criteria consistently","Generates structured candidate summaries","Routes to human reviewers by position","Maintains EEO documentation and audit log"],
       inputs:["Job applications and resumes","Position requirements / KSAs","Screening criteria and rules","EEO data","Assessment results"],
       outputs:["Screened applicant list with scores","Structured candidate summaries","Routed review queue","EEO documentation package","Audit trail of screening logic"],
       maturity:"Production-ready. Deployed in high-volume hiring environments with configurable criteria per position.",
       limits:["Screening quality depends on clarity of defined criteria","Does not make hiring selections — advisory only","Requires human review for all qualification determinations","ATS integration required"]},
      {name:"Isa",icon:"OB",module:"Selection, Hiring & Onboarding",trigger:"New Employee Hire Detected",
       what:"Manages offer workflows, coordinates hiring documentation collection, and executes structured onboarding task sequences for new employees from offer acceptance through first-day readiness.",
       problem:"Eliminates dropped tasks and delays in the offer-to-onboard process, ensuring every new hire completes required steps on time and documentation is complete before day one.",
       users:["HR onboarding specialists","Security / FSO staff","IT provisioning teams","New hire supervisors"],
       capabilities:["Triggers onboarding task sequences on hire confirmation","Tracks documentation completion in real time","Initiates background check and clearance workflows","Sends automated reminders for incomplete items","Coordinates across HR, IT, and security stakeholders"],
       inputs:["Offer acceptance confirmation","New hire personal data","Required documentation checklist","Background check rules","IT provisioning requests","Onboarding task templates"],
       outputs:["Completed onboarding task tracker","Documentation completion status","Background check initiation record","IT access request","Day-one readiness confirmation","Audit log"],
       maturity:"Production-ready. Modular task framework adapts to agency-specific onboarding requirements.",
       limits:["Cannot adjudicate clearances or make suitability determinations","Dependent on new hire responsiveness for document submission","IT provisioning timelines depend on external system capacity","Requires HRIS, background check system, and IT service desk integration"]},
      {name:"Ben",icon:"PM",module:"Performance & Development",trigger:"Performance Review Scheduled",
       what:"Schedules and orchestrates performance review cycles, collects self-assessments and manager inputs, flags overdue reviews, and consolidates data for HR reporting.",
       problem:"Prevents compliance failures from missed review deadlines and reduces administrative burden on managers and HR staff managing large-scale evaluation cycles.",
       users:["HR specialists","Supervisors and managers","CHCO office staff","L&D teams"],
       capabilities:["Schedules review cycles and sends participant notifications","Collects self-assessments and manager inputs via structured forms","Tracks completion status across the organization","Flags overdue reviews for HR escalation","Consolidates appraisal data for reporting"],
       inputs:["Employee roster and review schedules","Performance plan templates","Self-assessment forms","Manager review inputs","Training and development records"],
       outputs:["Review cycle status dashboard","Completed appraisal packages","Overdue review alerts","Consolidated performance data","IDP tracking report","Audit log"],
       maturity:"Production-ready. Configurable for annual, mid-year, and probationary review cycles.",
       limits:["Does not assign or recommend performance ratings","Quality depends on supervisor participation and timely input","Cannot substitute for manager judgment in evaluation","Requires performance management platform integration"]},
      {name:"Lily",icon:"CP",module:"Compensation & Benefits",trigger:"Payroll Period Initiated",
       what:"Triggers payroll period processing, validates compensation data against HR records and policy rules, flags anomalies and discrepancies for review before payroll execution.",
       problem:"Reduces payroll errors caused by stale or inconsistent data, ensures benefits elections are accurately reflected, and gives HR and finance staff actionable exception reports before disbursement.",
       users:["Payroll specialists","Benefits administrators","HR operations staff","Finance / budget analysts"],
       capabilities:["Triggers validation workflows at payroll cycle start","Compares compensation data to HR records and policy rules","Validates benefits elections against enrollment data","Flags anomalies and routes to reviewer","Generates pre-disbursement exception report"],
       inputs:["Payroll period schedule","Employee compensation records","Benefits elections data","Leave balances","Personnel action records","Payroll business rules"],
       outputs:["Pre-payroll validation report","Exception and anomaly list","Benefits reconciliation summary","Leave balance confirmation","Routed exceptions for approval","Audit log"],
       maturity:"Production-ready. Supports bi-weekly, semi-monthly, and monthly payroll cycles.",
       limits:["Validation quality depends on timeliness of upstream HR data","Does not execute payroll — supports pre-processing validation only","Cannot adjudicate complex compensation disputes","Requires payroll system, HRIS, and leave management integration"]},
      {name:"Lisa",icon:"TE",module:"Travel & Expense",trigger:"Travel Reimbursement Request",
       what:"Processes travel reimbursement requests by extracting claim data, validating against per diem rules and travel policy, identifying exceptions, and routing compliant requests for approval.",
       problem:"Eliminates manual policy lookup and calculation for travel claims, reduces processing time, catches policy violations before payment, and creates a complete audit record for each claim.",
       users:["Travelers / claimants","Travel administrators","Finance operations staff","Approving officials"],
       capabilities:["Extracts claim data from submitted forms and receipts","Validates against applicable per diem and travel policy rules","Calculates allowable vs. claimed amounts","Flags policy exceptions with specific rule citations","Routes compliant requests for approval"],
       inputs:["Travel reimbursement requests","Receipts and supporting documentation","Per diem rates and FTR/JTR rules","Trip authorization records","Approval routing rules"],
       outputs:["Validated reimbursement request","Policy compliance summary","Exception flags with detail","Routed approval package","Audit log"],
       maturity:"Production-ready. Configurable for FTR, JTR, and agency-specific travel policies.",
       limits:["Per diem rate accuracy depends on rule table maintenance","Unusual circumstances require human judgment","Receipt quality affects data extraction accuracy","Travel management system integration required"]},
      {name:"Cleo",icon:"SR",module:"Separation & Retirement",trigger:"Retirement Notification",
       what:"Manages offboarding and retirement processing workflows triggered by separation notifications, coordinating tasks across HR, IT, security, finance, and benefits to ensure complete and compliant offboarding.",
       problem:"Prevents gaps in offboarding that create security, financial, or compliance risks by orchestrating all steps from a single trigger.",
       users:["HR specialists","Security / FSO staff","IT administrators","Payroll and benefits teams","Supervisors"],
       capabilities:["Triggers multi-stakeholder offboarding task sequences","Coordinates clearance revocation and IT access termination","Calculates final pay, leave payouts, and benefits continuation","Tracks task completion across departments","Generates retirement documentation packages"],
       inputs:["Separation or retirement notice","Employee record and service history","Final leave balance data","Benefits continuation elections","IT asset inventory","Clearance and access records"],
       outputs:["Offboarding task completion tracker","Final pay calculation package","Clearance revocation request","IT access termination confirmation","Benefits transition documentation","Audit log"],
       maturity:"Production-ready. Handles voluntary separation, retirement, and RIF offboarding scenarios.",
       limits:["Retirement benefit calculations require current OPM rule accuracy","Clearance revocation timelines depend on security office capacity","Complex cases require specialist handling","Requires HRIS, IT provisioning, and security clearance system integration"]},
    ]
  },
  {
    id:"p2p",label:"P2P",full:"Procure-to-Pay",color:"#6d28d9",light:"#f5f0ff",border:"#c4b5fd",
    desc:"Full procurement lifecycle automation from demand planning through invoice processing and payment disbursement.",
    agents:[
      {name:"Alice",icon:"DP",module:"Demand Planning",trigger:"Demand Signal Detected",
       what:"Analyzes demand signals from program data, consumption history, and operational inputs to initiate procurement planning workflows and generate preliminary requirements documentation.",
       problem:"Reduces lag between mission need identification and procurement initiation, improving lead time management and reducing emergency or sole-source procurement situations.",
       users:["Contracting officers / CORs","Program managers","Logistics and supply chain staff","Budget analysts"],
       capabilities:["Aggregates demand signals from multiple program data sources","Generates preliminary requirements documentation","Aligns demand forecasts with fiscal year budget data","Initiates procurement planning workflows","Flags supply risk based on lead time and inventory data"],
       inputs:["Program demand data","Historical consumption records","Budget and fiscal year data","Inventory levels","Program schedule data"],
       outputs:["Demand forecast summary","Initiated procurement planning record","Requirements draft","Budget alignment report","Audit log"],
       maturity:"Production-ready. Supports annual acquisition planning and ongoing demand monitoring cycles.",
       limits:["Forecast accuracy depends on data quality and historical record completeness","Cannot account for unplanned mission changes without updated inputs","Requires program management system and budget system integration"]},
      {name:"Jessica",icon:"SS",module:"Supplier Selection",trigger:"Vendor Need Identified",
       what:"Evaluates and scores supplier candidates against defined criteria including past performance, pricing, compliance status, and capability data, producing structured comparison summaries for human decision-makers.",
       problem:"Replaces time-consuming manual vendor research and scoring with consistent, documented evaluation that supports defensible source selection decisions.",
       users:["Contracting officers","Source selection officials","Small business specialists","Program managers"],
       capabilities:["Queries SAM.gov and debarment lists for compliance status","Scores suppliers against defined evaluation criteria","Flags small business categories and set-aside eligibility","Generates structured comparison summaries","Maintains evaluation audit trail"],
       inputs:["Supplier capability data","SAM.gov / EPLS registration status","Past performance records","Pricing data","Small business classification data","Evaluation criteria"],
       outputs:["Scored supplier comparison matrix","Compliance status summary","Small business eligibility flags","Source selection support package","Audit log"],
       maturity:"Production-ready. Criteria framework configurable per acquisition type and set-aside category.",
       limits:["Cannot make final source selection determinations — advisory only","Data quality depends on supplier registration accuracy","Complex procurements require additional technical evaluation","SAM.gov API access required"]},
      {name:"Elsa",icon:"SO",module:"Supplier Onboarding",trigger:"New Supplier Approved",
       what:"Automates supplier registration workflows including documentation collection, data validation, SAM.gov alignment checks, and vendor master data setup in financial systems.",
       problem:"Eliminates manual data entry and back-and-forth with suppliers during registration, reducing onboarding time and ensuring master data accuracy before the first transaction.",
       users:["Contracting officers","AP / finance staff","Procurement administrators","Vendor management teams"],
       capabilities:["Collects and validates supplier documentation","Verifies SAM.gov registration and expiration status","Validates banking and payment routing data","Creates vendor master record in financial system","Routes incomplete submissions back to supplier"],
       inputs:["Supplier registration request","Business documentation (TIN, banking)","SAM.gov registration data","Vendor classification data","Approval routing rules"],
       outputs:["Validated vendor master record","SAM.gov compliance confirmation","Banking data verification summary","Onboarding completion notification","Audit log"],
       maturity:"Production-ready. Supports new vendor setup and annual SAM.gov re-registration validation.",
       limits:["Cannot verify ownership or beneficial interest beyond submitted documentation","SAM.gov data accuracy depends on supplier registration maintenance","Requires financial system vendor master access and SAM.gov API integration"]},
      {name:"Olivia",icon:"PO",module:"PO Creation",trigger:"Requisition Approved",
       what:"Generates purchase orders from approved requisitions, applies validation checks for funding availability, contract linkage, and data completeness, and routes for final approval before issuance.",
       problem:"Eliminates manual PO drafting, reduces data entry errors, and ensures every PO is properly funded, linked to a contract or authority, and approved before commitment.",
       users:["Contracting officers","Purchasing agents","Budget analysts","Program managers"],
       capabilities:["Generates PO from approved requisition data","Checks funds availability against budget system","Validates contract linkage and authority","Routes for approval based on dollar threshold","Records obligation upon approval"],
       inputs:["Approved requisition","Budget / funds availability data","Contract or BPA reference","Item/service specifications","Vendor master data","Approval thresholds"],
       outputs:["Draft PO with validation results","Funds availability confirmation","Approved PO ready for issuance","Obligation record","Audit log"],
       maturity:"Production-ready. Configurable for simplified acquisition and contract-based purchasing workflows.",
       limits:["Cannot create contracts or acquisition instruments","Funds availability check depends on real-time budget system data","Complex modifications require manual contracting action","Requires ERP/financial management system and budget system integration"]},
      {name:"Chris",icon:"GR",module:"Goods Receipt",trigger:"Delivery Received",
       what:"Records and validates goods and services receipts against purchase order data, identifies discrepancies in quantity, condition, or specifications, and routes exceptions for authorized acceptance.",
       problem:"Eliminates manual receiving log entries, ensures receipt documentation is complete before invoice processing begins, and creates a reliable record for 3-way match execution.",
       users:["Receiving / warehouse staff","CORs / COTRs","Property managers","AP teams"],
       capabilities:["Records receipt against PO line items","Validates quantity and specification matches","Flags shortages, overages, or damaged goods","Generates structured receiving report","Updates property accountability records"],
       inputs:["Delivery documentation / packing list","Purchase order data","Inspection criteria","Property accountability rules","Acceptance authority designation"],
       outputs:["Validated receiving report","Discrepancy flags with detail","Property record update","Acceptance confirmation","3-way match input record","Audit log"],
       maturity:"Production-ready. Supports full and partial delivery scenarios with configurable acceptance rules.",
       limits:["Cannot perform physical inspection — supports documentation only","Condition assessment requires human inspector","Partial delivery handling requires defined business rules","Requires PO system and property management system integration"]},
      {name:"Tony",icon:"IM",module:"Inventory Management",trigger:"Inventory Update Detected",
       what:"Monitors inventory levels across locations, flags reorder points and stock-outs, reconciles discrepancies between physical counts and system records, and generates inventory status reports.",
       problem:"Prevents stockouts and excess inventory through proactive monitoring, reduces manual reconciliation labor, and maintains accurate property records required for audit.",
       users:["Supply chain / logistics staff","Property managers","Procurement teams","Finance / budget analysts"],
       capabilities:["Monitors stock levels against defined reorder thresholds","Reconciles system records with physical count data","Flags discrepancies and routes for investigation","Identifies excess and obsolete inventory","Generates audit-ready inventory reports"],
       inputs:["Inventory system data","Physical count records","Reorder point rules","Property accountability data","Consumption history"],
       outputs:["Inventory status report","Reorder recommendations","Discrepancy flags","Reconciliation summary","Excess property identification","Audit log"],
       maturity:"Production-ready. Supports multi-location inventory with configurable reorder and accountability rules.",
       limits:["Accuracy depends on real-time system data and physical count frequency","Cannot independently verify physical inventory","Disposal recommendations require human and regulatory review","Requires inventory management and property management system integration"]},
      {name:"Ryan",icon:"RM",module:"Returns Management",trigger:"Return Request Initiated",
       what:"Processes vendor return requests by documenting the return reason, coordinating with suppliers, initiating credit or replacement workflows, and updating inventory and financial records.",
       problem:"Replaces manual return coordination with a structured, documented process that ensures credits are received, inventory is accurately updated, and the supplier is held accountable.",
       users:["Receiving / supply staff","Contracting officers","AP teams","Property managers"],
       capabilities:["Initiates return authorization workflow","Notifies supplier with structured return documentation","Tracks credit or replacement receipt","Updates inventory records upon return confirmation","Maintains return audit trail"],
       inputs:["Return request with reason code","Original PO and receipt data","Vendor contact and return instructions","Inventory records","Credit/replacement rules"],
       outputs:["Return authorization record","Vendor return notification","Credit or replacement request","Updated inventory record","Audit log"],
       maturity:"Production-ready. Handles defective goods, over-delivery, and warranty return scenarios.",
       limits:["Supplier responsiveness affects process cycle time","Complex warranty or dispute cases require contracting officer involvement","Requires inventory system access and supplier communication integration"]},
      {name:"Daniel",icon:"IP",module:"Invoice Processing & 3-Way Match",trigger:"Invoice Received",
       what:"Automates the review of supplier invoices against purchase orders, receiving records, and business rules to identify matches, discrepancies, and exceptions requiring human review.",
       problem:"Reduces manual effort in invoice review, improves accuracy, speeds processing cycles, and allows AP staff to focus on exception handling rather than repetitive verification of routine transactions.",
       users:["AP teams","Procurement analysts","Finance operations staff","Shared services personnel"],
       capabilities:["Extracts and normalizes data from invoices and supporting documents","Compares invoice details to PO and receipt records at line-item level","Flags quantity, pricing, or documentation mismatches","Routes exceptions to designated reviewers","Creates audit-ready processing summaries"],
       inputs:["Supplier invoices","Purchase orders","Goods receipt records","Vendor master data","Approval rules and tolerance thresholds","ERP data"],
       outputs:["3-way match result","Discrepancy report","Exception queue","Approval recommendation","Audit log"],
       maturity:"Production-ready. Repeatable deployment pattern for document-driven finance workflows.",
       limits:["Performance depends on document quality and OCR readability","Requires complete PO and receipt records to execute match","Final approval authority remains with authorized personnel","Requires ERP integration and defined matching rules and thresholds"]},
      {name:"David",icon:"PP",module:"Payment Processing",trigger:"Invoice Approved for Payment",
       what:"Validates approved invoices for payment readiness, applies final pre-payment checks, and routes payment packages to the appropriate disbursement channel or Treasury system.",
       problem:"Reduces payment errors and delays by ensuring all required approvals and documentation are complete before disbursement initiation, and creates a clean handoff to payment execution.",
       users:["AP / disbursement staff","Finance operations teams","Budget analysts","Shared services personnel"],
       capabilities:["Validates approved invoice package completeness","Confirms vendor banking data accuracy","Applies pre-payment business rule checks","Routes to appropriate payment channel (EFT, check, IPAC)","Records disbursement data for financial reporting"],
       inputs:["Approved invoice package","Vendor banking / payment data","Funds certification","Payment method rules","Treasury / IPAC routing data"],
       outputs:["Payment-ready package","Pre-payment validation results","Payment routing confirmation","Disbursement record","Audit log"],
       maturity:"Production-ready. Supports EFT, check, and IPAC payment channels with configurable routing rules.",
       limits:["Does not execute payment independently — prepares and routes only","Dependent on approved invoice package completeness","IPAC and Treasury system integration requires agency-specific configuration"]},
    ]
  },
  {
    id:"o2c",label:"O2C",full:"Order-to-Cash",color:"#4338ca",light:"#eef2ff",border:"#a5b4fc",
    desc:"Complete order fulfillment and receivables automation from order intake through accounts receivable management.",
    agents:[
      {name:"Nico",icon:"OP",module:"Order Processing",trigger:"New Order Received",
       what:"Ingests and validates incoming orders from internal or external customers, applies business rules for completeness and authorization, and initiates fulfillment workflows.",
       problem:"Eliminates manual order intake and routing, reduces order errors at the point of entry, and accelerates time from order receipt to fulfillment initiation.",
       users:["Order management staff","Supply chain coordinators","Program managers","Customer service teams"],
       capabilities:["Ingests orders from multiple channels (EDI, portal, manual)","Validates against authorization, catalog, and inventory data","Routes exceptions for human review","Initiates fulfillment workflow on validation","Sends order acknowledgment to customer"],
       inputs:["Incoming order data","Customer / agency authorization data","Product or service catalog","Inventory availability data","Routing rules"],
       outputs:["Validated order record","Fulfillment initiation trigger","Order acknowledgment","Exception flags for incomplete orders","Audit log"],
       maturity:"Production-ready. Supports multi-channel order intake with configurable validation rules.",
       limits:["Validation quality depends on data completeness at submission","Unusual order types may require manual handling","Requires order management system and inventory system integration"]},
      {name:"Diana",icon:"DL",module:"Delivery Planning",trigger:"Order Validated",
       what:"Plans and schedules delivery logistics based on validated order data, inventory availability, and customer delivery requirements, generating optimized delivery schedules.",
       problem:"Replaces manual delivery planning with an automated, data-driven scheduling process that reduces delays and improves on-time delivery performance.",
       users:["Logistics coordinators","Supply chain planners","Warehouse managers","Program managers"],
       capabilities:["Generates delivery schedules based on order and inventory data","Allocates warehouse resources to order fulfillment","Flags SLA risk based on current capacity","Recommends carrier assignments","Updates delivery plan as conditions change"],
       inputs:["Validated order data","Inventory and warehouse data","Customer delivery requirements","SLA / delivery commitment rules","Carrier capacity data"],
       outputs:["Delivery schedule","Resource and capacity plan","SLA compliance forecast","Carrier assignment recommendations","Audit log"],
       maturity:"Production-ready. Configurable for single and multi-location fulfillment environments.",
       limits:["Planning accuracy depends on real-time inventory and carrier data","Unforeseen disruptions require human re-planning","Requires order management, warehouse management, and carrier data integration"]},
      {name:"James",icon:"TP",module:"Transportation Planning",trigger:"Delivery Scheduled",
       what:"Optimizes routing and carrier selection for outbound shipments based on delivery requirements, cost parameters, compliance rules, and carrier availability.",
       problem:"Replaces manual carrier selection and routing with automated optimization that reduces shipping costs, improves delivery reliability, and ensures carrier compliance documentation.",
       users:["Transportation coordinators","Logistics managers","Contracting officers","Supply chain staff"],
       capabilities:["Evaluates carrier options against cost, compliance, and capacity criteria","Generates optimized routing recommendations","Documents carrier compliance (small business, AbilityOne, etc.)","Creates shipment instruction packages","Tracks carrier selection rationale for audit"],
       inputs:["Delivery schedule data","Carrier database and rates","Routing optimization rules","Compliance requirements (carrier type, set-aside)","Shipment specifications"],
       outputs:["Optimized routing plan","Carrier selection recommendation","Compliance documentation","Shipment instruction package","Audit log"],
       maturity:"Production-ready. Supports multi-carrier environments with configurable compliance rule sets.",
       limits:["Routing optimization depends on carrier data currency","Sensitive or classified shipments require additional security protocols beyond agent scope","Requires carrier database and routing engine integration"]},
      {name:"Julia",icon:"OL",module:"Outbound Logistics",trigger:"Shipment Ready for Dispatch",
       what:"Manages outbound shipment execution including shipping document generation, carrier handoff coordination, tracking initiation, and delivery confirmation processing.",
       problem:"Eliminates manual shipping document preparation and handoff coordination, ensures all required documentation accompanies shipments, and creates a real-time tracking record.",
       users:["Warehouse / shipping staff","Logistics coordinators","Property managers","Program managers"],
       capabilities:["Generates bills of lading and shipping documentation","Coordinates carrier pickup and handoff","Initiates shipment tracking","Processes delivery confirmation upon receipt","Flags shipment exceptions and delays"],
       inputs:["Approved shipment plan","Packing list and item data","Carrier instructions","Regulatory shipping requirements","Customer delivery confirmation rules"],
       outputs:["Shipping documentation package","Carrier handoff confirmation","Tracking number and shipment record","Delivery confirmation","Audit log"],
       maturity:"Production-ready. Supports standard and regulated shipment types with carrier API integration.",
       limits:["Cannot replace physical inspection or packing processes","Hazmat and classified item handling requires specialist oversight","Carrier API availability affects real-time tracking","Requires warehouse management and carrier API connectivity"]},
      {name:"Ryan",icon:"RT",module:"Returns Management",trigger:"Customer Return Request",
       what:"Handles customer return requests by validating return eligibility, generating return authorizations, coordinating logistics, and initiating credit or replacement processing.",
       problem:"Replaces ad hoc return handling with a structured process that consistently validates eligibility, documents the return, and ensures credits or replacements are issued accurately.",
       users:["Customer service teams","Logistics coordinators","Accounts receivable staff","Program managers"],
       capabilities:["Validates return request against eligibility rules and order data","Issues return authorization and shipping instructions","Coordinates return logistics","Initiates credit or replacement workflow","Updates inventory on receipt of return"],
       inputs:["Customer return request","Original order and delivery data","Return eligibility rules","Product condition data","Credit / replacement rules"],
       outputs:["Return authorization","Return shipping instructions","Credit or replacement initiation","Inventory update","Audit log"],
       maturity:"Production-ready. Handles warranty, damage, and over-delivery return scenarios.",
       limits:["Eligibility determination depends on defined rules and order data quality","Physical condition assessment requires human inspection","Requires order management system and AR system integration"]},
      {name:"Mia",icon:"CM",module:"Credit Management",trigger:"High-Risk Transaction Detected",
       what:"Evaluates credit exposure and financial risk for transactions and customer accounts, flags high-risk situations for human review, and generates credit status summaries.",
       problem:"Provides proactive risk visibility on AR balances and transaction exposure, reducing the likelihood of uncollectible receivables and supporting informed credit decisions.",
       users:["Accounts receivable staff","Finance managers","Program managers","Budget analysts"],
       capabilities:["Evaluates account-level credit exposure against defined limits","Flags transactions that exceed risk thresholds","Generates credit status summaries by customer/agency","Tracks payment history trends","Routes high-risk flags for human review"],
       inputs:["Customer / agency account data","Transaction history","Outstanding AR balances","Credit limit rules","Payment history data"],
       outputs:["Credit risk assessment","High-risk transaction flags","Account status summary","Credit limit utilization report","Audit log"],
       maturity:"Production-ready. Configurable credit limit rules by account type and transaction category.",
       limits:["Risk assessment based on available financial data only","Cannot account for off-system obligations or unrecorded liabilities","Requires AR system integration and credit limit rule configuration"]},
      {name:"Alice",icon:"SM",module:"Stock Management",trigger:"Stock Update Detected",
       what:"Monitors fulfillment-side stock levels, reconciles inventory against order demand, triggers replenishment workflows, and generates stock availability reports.",
       problem:"Prevents fulfillment failures caused by stockouts, reduces excess inventory costs, and provides real-time stock visibility to support order promising and delivery planning.",
       users:["Supply chain / logistics staff","Warehouse managers","Program managers","Finance staff"],
       capabilities:["Monitors stock levels against demand and safety stock thresholds","Triggers replenishment workflows at reorder points","Reconciles available inventory with open order demand","Flags fulfillment risk by item and location","Generates stock reports for financial and operational use"],
       inputs:["Inventory system data","Open order demand data","Reorder point and safety stock rules","Receiving records","Replenishment lead time data"],
       outputs:["Stock availability report","Reorder triggers","Fulfillment risk flags","Inventory reconciliation summary","Audit log"],
       maturity:"Production-ready. Supports single and multi-location stock environments with configurable thresholds.",
       limits:["Accuracy requires real-time inventory system data","Physical count verification is a human process","Requires inventory / warehouse management and order management system integration"]},
      {name:"Nina",icon:"AR",module:"Accounts Receivable",trigger:"Invoice Issued",
       what:"Manages accounts receivable workflows by applying incoming payments to open invoices, flagging overdue accounts, generating aging reports, and initiating collections follow-up.",
       problem:"Reduces days sales outstanding and uncollectible balances by automating payment application, proactively identifying overdue accounts, and ensuring collections actions are taken consistently.",
       users:["Accounts receivable staff","Finance managers","Budget analysts","Collections officers"],
       capabilities:["Applies incoming payments to open invoice records","Generates AR aging reports by account and period","Flags overdue accounts and initiates collections follow-up","Reconciles inter-agency billing discrepancies","Produces data for financial statement reporting"],
       inputs:["Issued invoices / billing records","Incoming payment data","Aging rules and collection thresholds","Customer / agency account data","Debt collection rules"],
       outputs:["Payment application records","AR aging report","Overdue account alerts","Collections action initiation","Financial reporting data","Audit log"],
       maturity:"Production-ready. Supports standard and inter-agency AR workflows with configurable aging and collections rules.",
       limits:["Payment application accuracy depends on invoice and remittance data matching","Debt collection escalation beyond automated follow-up requires human and legal involvement","Requires financial management / AR system and payment receipt data feed integration"]},
    ]
  }
];

const areaIcons = {
  h2r:(<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.6"/><path d="M3.5 23c0-5.247 4.253-9.5 9.5-9.5s9.5 4.253 9.5 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  p2p:(<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="7" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="15" y="11" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M11 11h4M11 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>),
  o2c:(<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M5 7h16M5 7l2-3M21 7l-2-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><rect x="3" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M9 14l3 3 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>),
};

function AgentDetail({ agent: a, area, onBack, onHome }) {
  var c = area.color;
  function Row({ label, items }) {
    return (
      <div style={{ background:"#f9fafb", borderRadius:8, padding:"14px 16px" }}>
        <div style={{ fontSize:10, fontWeight:500, color:"#9ca3af", letterSpacing:"0.08em", marginBottom:8 }}>{label}</div>
        {items.map(function(x,i) {
          return (
            <div key={i} style={{ display:"flex", gap:8, marginBottom:5, alignItems:"flex-start" }}>
              <span style={{ color:c, fontSize:12, flexShrink:0, marginTop:2 }}>›</span>
              <span style={{ fontSize:13, color:"#111827", lineHeight:1.5 }}>{x}</span>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div style={{ padding:"24px 28px", maxWidth:860, margin:"0 auto" }}>
      <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:12, overflow:"hidden" }}>
        <div style={{ background:c, padding:"22px 26px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16 }}>
          <div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.6)", fontWeight:500, letterSpacing:"0.1em", marginBottom:4 }}>{area.label} · {area.full.toUpperCase()} · CAPABILITY SHEET</div>
            <div style={{ fontSize:22, fontWeight:500, color:"#fff", marginBottom:4 }}>{a.module}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.75)" }}>Agent: <strong style={{color:"#fff",fontWeight:500}}>{a.name}</strong> &nbsp;·&nbsp; Trigger: {a.trigger}</div>
          </div>
          <span style={{ background:"rgba(255,255,255,0.2)", color:"#fff", borderRadius:6, padding:"4px 12px", fontSize:11, fontWeight:500, flexShrink:0 }}>Production-ready</span>
        </div>
        <div style={{ padding:"22px 26px", display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:area.light, borderLeft:"3px solid "+c, borderRadius:"0 8px 8px 0", padding:"14px 16px" }}>
            <div style={{ fontSize:10, fontWeight:500, color:c, letterSpacing:"0.08em", marginBottom:6 }}>WHAT IT DOES</div>
            <p style={{ margin:0, fontSize:13, color:"#111827", lineHeight:1.65 }}>{a.what}</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <div style={{ background:area.light, borderRadius:8, padding:"14px 16px" }}>
              <div style={{ fontSize:10, fontWeight:500, color:c, letterSpacing:"0.08em", marginBottom:6 }}>BUSINESS PROBLEM SOLVED</div>
              <p style={{ margin:0, fontSize:13, color:"#111827", lineHeight:1.65 }}>{a.problem}</p>
            </div>
            <div style={{ background:area.light, borderRadius:8, padding:"14px 16px" }}>
              <div style={{ fontSize:10, fontWeight:500, color:c, letterSpacing:"0.08em", marginBottom:8 }}>IDEAL USER / OPERATOR</div>
              {a.users.map(function(u,i) {
                return (
                  <div key={i} style={{ display:"flex", gap:8, marginBottom:5, alignItems:"flex-start" }}>
                    <span style={{ color:c, fontSize:12, flexShrink:0, marginTop:2 }}>›</span>
                    <span style={{ fontSize:13, color:"#111827", lineHeight:1.5 }}>{u}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ background:"#f9fafb", borderRadius:8, padding:"14px 16px" }}>
            <div style={{ fontSize:10, fontWeight:500, color:"#9ca3af", letterSpacing:"0.08em", marginBottom:8 }}>KEY FEATURES & CAPABILITIES</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 24px" }}>
              {a.capabilities.map(function(x,i) {
                return (
                  <div key={i} style={{ display:"flex", gap:8, marginBottom:5, alignItems:"flex-start" }}>
                    <span style={{ color:c, fontSize:12, flexShrink:0, marginTop:2 }}>›</span>
                    <span style={{ fontSize:13, color:"#111827", lineHeight:1.5 }}>{x}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <Row label="INPUTS REQUIRED" items={a.inputs} />
            <Row label="OUTPUTS & DELIVERABLES" items={a.outputs} />
          </div>
          <div style={{ background:"#f0fdf4", border:"0.5px solid #bbf7d0", borderRadius:8, padding:"14px 16px" }}>
            <div style={{ fontSize:10, fontWeight:500, color:"#16a34a", letterSpacing:"0.08em", marginBottom:6 }}>MATURITY & READINESS</div>
            <p style={{ margin:0, fontSize:13, color:"#111827", lineHeight:1.65 }}>{a.maturity}</p>
          </div>
          <div style={{ background:"#fff7ed", border:"0.5px solid #fed7aa", borderRadius:8, padding:"14px 16px" }}>
            <div style={{ fontSize:10, fontWeight:500, color:"#c2410c", letterSpacing:"0.08em", marginBottom:8 }}>LIMITATIONS, DEPENDENCIES & IMPLEMENTATION REQUIREMENTS</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 24px" }}>
              {a.limits.map(function(x,i) {
                return (
                  <div key={i} style={{ display:"flex", gap:8, marginBottom:5, alignItems:"flex-start" }}>
                    <span style={{ color:"#c2410c", fontSize:12, flexShrink:0, marginTop:2 }}>›</span>
                    <span style={{ fontSize:13, color:"#111827", lineHeight:1.5 }}>{x}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ display:"flex", gap:8, paddingTop:4 }}>
            <button onClick={onBack} style={{ fontSize:12, padding:"7px 16px", borderRadius:6, border:"0.5px solid "+area.border, color:c, cursor:"pointer", background:"#fff" }}>
              Back to {area.label} agents
            </button>
            <button onClick={onHome} style={{ fontSize:12, padding:"7px 16px", borderRadius:6, border:"0.5px solid #e5e7eb", color:"#6b7280", cursor:"pointer", background:"#fff" }}>
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

var agentRunData = {
  "Daniel": {
    runs:[
      { date:"Aug 05, 2025 · 11:41 AM", status:"In progress", duration:"1m 26s", desc:"Invoice validation batch", ref:"INV-2025-1042", vendor:"DHL Express Mexico", amount:"$4,320.00", stage:"2-way match",
        stages:["Invoice received","Data extraction","2-way match","Record update"], stageStatus:[true,true,false,false],
        details:[{label:"Invoice number",val:"INV-2025-1042"},{label:"Vendor",val:"DHL Express Mexico"},{label:"Amount",val:"$4,320.00"},{label:"PO reference",val:"PO-0842"},{label:"Department",val:"Logistics"},{label:"Payment method",val:"EFT"}],
        chat:[
          {from:"agent",name:"Daniel",time:"11:41 AM",msg:"Hello, I've received invoice INV-2025-1042 from DHL Express Mexico for $4,320.00. I'm currently running a 3-way match against PO-0842. I'll notify you if any discrepancies are found."},
          {from:"user",name:"Carlos Aguilar",time:"11:43 AM",msg:"Thanks Daniel, please flag anything over a 2% variance on the line items."},
          {from:"agent",name:"Daniel",time:"11:43 AM",msg:"Understood. I've updated my matching tolerance to flag variances above 2%. Continuing the validation now."},
          {from:"user",name:"Carlos Aguilar",time:"11:50 AM",msg:"Any updates? We need this cleared before end of day."},
          {from:"agent",name:"Daniel",time:"11:50 AM",msg:"Currently at the 2-way match stage. Line items 1–6 matched successfully. Item 7 shows a $48 variance — within the 2% threshold. Estimated completion in 3 minutes."},
        ]
      },
      { date:"Jul 22, 2025 · 03:15 PM", status:"Successful", duration:"1m 26s", desc:"3-way match processing batch", ref:"INV-2025-1041", vendor:"Francisco Javier Olvera", amount:"$1,850.00", stage:"Record update",
        stages:["Invoice received","Data extraction","2-way match","Record update"], stageStatus:[true,true,true,true],
        details:[{label:"Invoice number",val:"INV-2025-1041"},{label:"Vendor",val:"Francisco Javier Olvera"},{label:"Amount",val:"$1,850.00"},{label:"PO reference",val:"PO-0839"},{label:"Department",val:"Transport"},{label:"Payment method",val:"Corporate Credit Card"}],
        chat:[
          {from:"agent",name:"Daniel",time:"03:15 PM",msg:"Invoice INV-2025-1041 from Francisco Javier Olvera received. Starting validation against PO-0839."},
          {from:"user",name:"Ana Torres",time:"03:17 PM",msg:"This vendor has had issues before — please double check the receipt documentation."},
          {from:"agent",name:"Daniel",time:"03:17 PM",msg:"Confirmed. I'm cross-referencing against the goods receipt records from Jul 20. All quantities and prices matched. Invoice has been approved and routed for payment."},
          {from:"user",name:"Ana Torres",time:"03:20 PM",msg:"Great, thank you. Please send the audit summary to finance."},
          {from:"agent",name:"Daniel",time:"03:20 PM",msg:"Audit summary generated and sent to finance@company.com. Record updated successfully."},
        ]
      },
      { date:"Jun 10, 2025 · 08:32 AM", status:"In review", duration:"1m 26s", desc:"PO reconciliation batch", ref:"INV-2025-1040", vendor:"Alezo Logistics", amount:"$9,100.00", stage:"Data extraction",
        stages:["Invoice received","Data extraction","2-way match","Record update"], stageStatus:[true,false,false,false],
        details:[{label:"Invoice number",val:"INV-2025-1040"},{label:"Vendor",val:"Alezo Logistics"},{label:"Amount",val:"$9,100.00"},{label:"PO reference",val:"Missing"},{label:"Department",val:"Operations"},{label:"Payment method",val:"EFT"}],
        chat:[
          {from:"agent",name:"Daniel",time:"08:32 AM",msg:"Invoice INV-2025-1040 received from Alezo Logistics for $9,100.00. I was unable to locate a matching PO reference in the document. This has been flagged for human review."},
          {from:"user",name:"Carlos Aguilar",time:"08:35 AM",msg:"Can you check if there's a blanket PO for Alezo on file?"},
          {from:"agent",name:"Daniel",time:"08:35 AM",msg:"I searched the PO database for active blanket agreements with Alezo Logistics. Found BPA-0012 covering logistics services up to $8,000. The invoice amount of $9,100 exceeds the BPA ceiling — this requires a contracting officer review."},
          {from:"user",name:"Carlos Aguilar",time:"08:40 AM",msg:"Okay, I'll escalate to the CO. Hold the invoice pending approval."},
          {from:"agent",name:"Daniel",time:"08:40 AM",msg:"Invoice placed on hold. I've created an exception ticket #EXC-2025-088 and notified the contracting officer. I'll update you when a decision is made."},
        ]
      },
    ]
  },
  "Isa": {
    runs:[
      { date:"Aug 12, 2025 · 09:00 AM", status:"In progress", duration:"3d 4h", desc:"New hire onboarding — Sarah Mitchell", ref:"OB-2025-0091", vendor:"Sarah Mitchell", amount:"Grade GS-11", stage:"Background check",
        stages:["Offer accepted","Documentation","Background check","IT provisioning"], stageStatus:[true,true,false,false],
        details:[{label:"Onboarding ID",val:"OB-2025-0091"},{label:"New hire",val:"Sarah Mitchell"},{label:"Position",val:"Program Analyst GS-11"},{label:"Start date",val:"Sep 01, 2025"},{label:"Department",val:"IT Operations"},{label:"Security level",val:"Public Trust"}],
        chat:[
          {from:"agent",name:"Isa",time:"09:00 AM",msg:"Welcome Sarah! I'm Isa, your onboarding assistant. I've received your offer acceptance — congratulations on joining the team. I'll be guiding you through the next steps."},
          {from:"user",name:"Sarah Mitchell",time:"09:05 AM",msg:"Thank you! What do I need to do first?"},
          {from:"agent",name:"Isa",time:"09:05 AM",msg:"I've sent a documentation checklist to your personal email. You'll need to complete your I-9, emergency contact form, and benefits enrollment within 3 business days. The background check initiation form is already submitted on your behalf."},
          {from:"user",name:"Sarah Mitchell",time:"09:20 AM",msg:"I submitted everything. How long does the background check take?"},
          {from:"agent",name:"Isa",time:"09:20 AM",msg:"Public Trust clearances typically take 5–7 business days. I'll send you an update as soon as it clears. In the meantime, I've submitted your IT access request — your laptop and credentials will be ready on your start date."},
        ]
      },
      { date:"Jul 28, 2025 · 10:15 AM", status:"Completed", duration:"4d 2h", desc:"New hire onboarding — Marcus Lee", ref:"OB-2025-0088", vendor:"Marcus Lee", amount:"Grade GS-13", stage:"IT provisioning",
        stages:["Offer accepted","Documentation","Background check","IT provisioning"], stageStatus:[true,true,true,true],
        details:[{label:"Onboarding ID",val:"OB-2025-0088"},{label:"New hire",val:"Marcus Lee"},{label:"Position",val:"Senior Analyst GS-13"},{label:"Start date",val:"Aug 04, 2025"},{label:"Department",val:"Finance"},{label:"Security level",val:"Secret"}],
        chat:[
          {from:"agent",name:"Isa",time:"10:15 AM",msg:"Hi Marcus, I'm Isa. Your offer is confirmed and onboarding has officially started. I've pre-filled your SF-86 with the information from your application — please review and sign within 48 hours."},
          {from:"user",name:"Marcus Lee",time:"10:30 AM",msg:"Done, I've reviewed and signed the SF-86. What's next?"},
          {from:"agent",name:"Isa",time:"10:30 AM",msg:"Perfect. Background check is now submitted. I've also notified the IT security team to begin your Secret-level system access provisioning. Estimated clearance time is 10 business days given the Secret level."},
          {from:"user",name:"Marcus Lee",time:"Aug 03 · 2:00 PM",msg:"Just checking in — am I all set for tomorrow?"},
          {from:"agent",name:"Isa",time:"Aug 03 · 2:05 PM",msg:"Yes! Background check cleared yesterday. Your laptop has been shipped and will arrive by 9 AM tomorrow. System credentials sent to your work email. You're fully ready for day one. Welcome aboard!"},
        ]
      },
      { date:"Jul 10, 2025 · 02:00 PM", status:"In review", duration:"1d 6h", desc:"New hire onboarding — Diana Reyes", ref:"OB-2025-0081", vendor:"Diana Reyes", amount:"Grade GS-9", stage:"Documentation",
        stages:["Offer accepted","Documentation","Background check","IT provisioning"], stageStatus:[true,false,false,false],
        details:[{label:"Onboarding ID",val:"OB-2025-0081"},{label:"New hire",val:"Diana Reyes"},{label:"Position",val:"Analyst GS-9"},{label:"Start date",val:"Aug 01, 2025"},{label:"Department",val:"HR"},{label:"Security level",val:"Public Trust"}],
        chat:[
          {from:"agent",name:"Isa",time:"02:00 PM",msg:"Hi Diana, congratulations and welcome! I'm Isa and I'll be supporting your onboarding. I've sent your documentation package to your email — please complete all forms within 2 business days."},
          {from:"user",name:"Diana Reyes",time:"Jul 11 · 9:00 AM",msg:"I have a question about the I-9 — I have a foreign passport and a work visa. Is that acceptable?"},
          {from:"agent",name:"Isa",time:"Jul 11 · 9:02 AM",msg:"Yes, a valid foreign passport combined with your I-94 arrival record is an acceptable List A document for I-9 purposes. Please upload both documents in the portal. I've flagged this with HR for a manual verification to ensure compliance."},
          {from:"user",name:"Diana Reyes",time:"Jul 11 · 11:00 AM",msg:"Uploaded both. Anything else pending from me?"},
          {from:"agent",name:"Isa",time:"Jul 11 · 11:01 AM",msg:"I see the upload — thank you. HR is reviewing the I-9 documents now. Once cleared, I'll automatically advance you to the background check stage. I'll notify you within 24 hours."},
        ]
      },
    ]
  },
  "Nina": {
    runs:[
      { date:"Aug 10, 2025 · 08:00 AM", status:"In progress", duration:"2d 3h", desc:"AR aging review — Q3 collections", ref:"AR-2025-0312", vendor:"Multiple accounts", amount:"$184,500", stage:"Collections follow-up",
        stages:["Invoice issued","Payment matching","Aging review","Collections"], stageStatus:[true,true,true,false],
        details:[{label:"AR batch",val:"AR-2025-0312"},{label:"Period",val:"Q3 2025"},{label:"Open balance",val:"$184,500"},{label:"Accounts reviewed",val:"42"},{label:"Overdue accounts",val:"3"},{label:"DSO",val:"18 days"}],
        chat:[
          {from:"agent",name:"Nina",time:"08:00 AM",msg:"Good morning. I've completed the Q3 AR aging review. Of the 42 open invoices totaling $184,500, three accounts are overdue: Meridian Group ($42,000, 45 days), Apex Solutions ($18,200, 32 days), and Coastal Partners ($9,100, 28 days). I'm initiating collections follow-up for all three."},
          {from:"user",name:"Ana Torres",time:"08:15 AM",msg:"Meridian Group has been a recurring issue. Can you escalate that one to legal?"},
          {from:"agent",name:"Nina",time:"08:15 AM",msg:"Escalating Meridian Group to legal collections. I've prepared a debt summary for their account including invoice history, prior communications, and the outstanding $42,000 balance. I'll send it to legal@company.com and copy you."},
          {from:"user",name:"Ana Torres",time:"08:20 AM",msg:"Perfect. For Apex and Coastal, send a standard past-due notice first."},
          {from:"agent",name:"Nina",time:"08:20 AM",msg:"Past-due notices sent to Apex Solutions and Coastal Partners with 10-day response windows. I'll escalate automatically if no payment or response is received by Aug 20."},
        ]
      },
      { date:"Jul 31, 2025 · 05:00 PM", status:"Successful", duration:"45m", desc:"Monthly payment application", ref:"AR-2025-0298", vendor:"Multiple accounts", amount:"$1.2M applied", stage:"Payment matching",
        stages:["Invoice issued","Payment matching","Aging review","Collections"], stageStatus:[true,true,true,true],
        details:[{label:"AR batch",val:"AR-2025-0298"},{label:"Period",val:"July 2025"},{label:"Total applied",val:"$1,200,000"},{label:"Invoices matched",val:"89"},{label:"Unmatched items",val:"2"},{label:"Accuracy",val:"97.8%"}],
        chat:[
          {from:"agent",name:"Nina",time:"05:00 PM",msg:"July month-end payment application complete. I matched $1.2M across 89 invoices. Two remittances totaling $14,200 could not be automatically matched due to missing invoice references — these have been queued for manual review."},
          {from:"user",name:"Ana Torres",time:"05:05 PM",msg:"Good work. What were the two unmatched items?"},
          {from:"agent",name:"Nina",time:"05:06 PM",msg:"Payment 1: $9,800 from Horizon LLC — no invoice number on remittance. Likely matches INV-2025-0881 based on amount and date. Payment 2: $4,400 from Delta Corp — partial payment on INV-2025-0762. Both queued in the manual review folder with my notes attached."},
          {from:"user",name:"Ana Torres",time:"05:12 PM",msg:"I'll review those now. Thanks Nina."},
          {from:"agent",name:"Nina",time:"05:12 PM",msg:"Of course. Month-end AR report has been generated and sent to the finance distribution list. Closing balance and DSO metrics are included."},
        ]
      },
      { date:"Jul 15, 2025 · 10:30 AM", status:"In review", duration:"1h 20m", desc:"Disputed invoice resolution", ref:"AR-2025-0271", vendor:"Meridian Group", amount:"$42,000", stage:"Aging review",
        stages:["Invoice issued","Payment matching","Aging review","Collections"], stageStatus:[true,true,false,false],
        details:[{label:"AR batch",val:"AR-2025-0271"},{label:"Account",val:"Meridian Group"},{label:"Disputed amount",val:"$42,000"},{label:"Invoice",val:"INV-2025-0744"},{label:"Dispute reason",val:"Service quality"},{label:"Days outstanding",val:"45"}],
        chat:[
          {from:"agent",name:"Nina",time:"10:30 AM",msg:"I've received a formal dispute from Meridian Group for INV-2025-0744 ($42,000). They are citing service quality issues on the July 1 delivery. I've placed the invoice on dispute hold and notified the account manager."},
          {from:"user",name:"Carlos Aguilar",time:"10:45 AM",msg:"What documentation do we have on that delivery?"},
          {from:"agent",name:"Nina",time:"10:46 AM",msg:"I've pulled the delivery confirmation dated July 1, signed by J. Hartman at Meridian. There is also a satisfaction acknowledgment form on file. I'm compiling a dispute response package with these documents — it will be ready in 5 minutes."},
          {from:"user",name:"Carlos Aguilar",time:"11:00 AM",msg:"Send the package to Meridian and cc me."},
          {from:"agent",name:"Nina",time:"11:01 AM",msg:"Dispute response package sent to Meridian Group's AP contact and cc'd to you. I've set a 15-day resolution clock — if no response by July 30, I'll automatically escalate to the collections queue."},
        ]
      },
    ]
  }
};

function RunDetail({ run, agent: ag, onBack }) {
  var c = ag.color;
  var [msgs, setMsgs] = useState([]);
  var [input, setInput] = useState("");

  function sendMsg() {
    if (!input.trim()) return;
    var newMsgs = msgs.concat([{from:"user",name:"You",time:"now",msg:input}]);
    setMsgs(newMsgs);
    setInput("");
    setTimeout(function() {
      setMsgs(newMsgs.concat([{from:"agent",name:ag.name,time:"now",msg:"Thank you for your message. I've noted your input and will update the process accordingly. I'll notify you of any changes to the status of "+run.ref+"."}]));
    }, 800);
  }

  var allMsgs = run.chat.concat(msgs);

  return (
    <div style={{ padding:"0 32px 32px", maxWidth:960, margin:"0 auto" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"20px 0 16px" }}>
        <button onClick={onBack} style={{ fontSize:12, padding:"6px 12px", borderRadius:6, border:"0.5px solid #e5e7eb", color:"#6b7280", cursor:"pointer", background:"#fff", display:"flex", alignItems:"center", gap:5 }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 10.5L4.5 7 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to {ag.name}
        </button>
        <span style={{ fontSize:11, color:"#9ca3af" }}>›</span>
        <span style={{ fontSize:12, color:c, fontWeight:500 }}>{run.ref}</span>
        <span style={{ fontSize:11, color:"#9ca3af" }}>· {run.desc}</span>
      </div>

      <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"18px 20px", marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:500, color:"#111827", marginBottom:14 }}>Transaction details</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px 24px" }}>
          {run.details.map(function(d,i) {
            return (
              <div key={i}>
                <div style={{ fontSize:11, color:"#9ca3af", marginBottom:2 }}>{d.label}</div>
                <div style={{ fontSize:13, color:"#111827", fontWeight:500 }}>{d.val}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"18px 20px", marginBottom:16 }}>
        <div style={{ fontSize:13, fontWeight:500, color:"#111827", marginBottom:20 }}>Processing timeline</div>
        <div style={{ display:"flex", alignItems:"flex-start", gap:0, padding:"0 20px" }}>
          {run.stages.map(function(st,i) {
            var done = run.stageStatus[i];
            var active = !done && (i===0 || run.stageStatus[i-1]);
            var bg = done ? c : active ? "#f59e0b" : "#e5e7eb";
            var textC = done ? c : active ? "#92400e" : "#9ca3af";
            return (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }}>
                {i < run.stages.length-1 && (
                  <div style={{ position:"absolute", top:16, left:"50%", width:"100%", height:2, background: done ? c+"55" : "#e5e7eb", zIndex:0 }}></div>
                )}
                <div style={{ width:32, height:32, borderRadius:"50%", background: done ? c+"18" : active ? "#fef3c7" : "#f9fafb", border:"2px solid "+bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", zIndex:1, marginBottom:8 }}>
                  {done ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : (
                    <div style={{ width:8, height:8, borderRadius:"50%", background:bg }}></div>
                  )}
                </div>
                <div style={{ fontSize:11, fontWeight:500, color:textC, textAlign:"center", maxWidth:100 }}>{st}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, overflow:"hidden" }}>
        <div style={{ padding:"14px 20px", borderBottom:"0.5px solid #e5e7eb" }}>
          <div style={{ fontSize:13, fontWeight:500, color:"#111827" }}>Conversation</div>
          <div style={{ fontSize:11, color:"#9ca3af" }}>Between {ag.name} (AI agent) and the end user</div>
        </div>
        <div style={{ padding:"16px 20px", display:"flex", flexDirection:"column", gap:14, minHeight:240 }}>
          {allMsgs.map(function(m,i) {
            var isAgent = m.from === "agent";
            return (
              <div key={i} style={{ display:"flex", flexDirection: isAgent ? "row" : "row-reverse", gap:10, alignItems:"flex-end" }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background: isAgent ? c : "#6b7280", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:11, fontWeight:500, color:"#fff" }}>{isAgent ? ag.initials : "U"}</span>
                </div>
                <div style={{ maxWidth:"68%" }}>
                  <div style={{ fontSize:10, color:"#9ca3af", marginBottom:3, textAlign: isAgent ? "left" : "right" }}>{m.name} · {m.time}</div>
                  <div style={{ background: isAgent ? ag.light : "#f3f4f6", borderRadius: isAgent ? "0 10px 10px 10px" : "10px 0 10px 10px", padding:"10px 14px", fontSize:13, color:"#111827", lineHeight:1.5 }}>
                    {m.msg}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ padding:"12px 16px", borderTop:"0.5px solid #e5e7eb", display:"flex", gap:8, alignItems:"center" }}>
          <input value={input} onChange={function(e) { setInput(e.target.value); }}
            onKeyDown={function(e) { if (e.key==="Enter") sendMsg(); }}
            placeholder={"Message "+ag.name+"..."} style={{ flex:1, fontSize:13, padding:"8px 12px", borderRadius:8, border:"0.5px solid #d1d5db", background:"#f9fafb", color:"#111827", outline:"none" }} />
          <button onClick={sendMsg} style={{ padding:"8px 16px", borderRadius:8, background:c, border:"none", cursor:"pointer", color:"#fff", fontSize:12, fontWeight:500 }}>Send</button>
        </div>
      </div>
    </div>
  );
}

function AgentMonitor({ agent: ag, onBack }) {
  var c = ag.color;
  var [selectedRun, setSelectedRun] = useState(null);
  var runHistory = agentRunData[ag.name] ? agentRunData[ag.name].runs : [];
  var exceptions = [
    { type:"Price mismatch", ref:"INV-2024-003", severity:"high" },
    { type:"Missing PO reference", ref:"INV-2024-007", severity:"medium" },
    { type:"Duplicate invoice detected", ref:"INV-2024-011", severity:"medium" },
  ];
  var stages = ag.name==="Isa" ? ["Offer accepted","Documentation","Background check","IT provisioning"] :
               ag.name==="Nina" ? ["Invoice issued","Payment matching","Aging review","Collections"] :
               ["Invoice received","Data extraction","2-way match","Record update"];
  var stageCounts = [4,3,2,3];

  var statusColor = function(s) {
    if (s==="Successful"||s==="Completed") return { bg:"#dcfce7", color:"#166534" };
    if (s==="In progress") return { bg:"#dbeafe", color:"#1e40af" };
    if (s==="In review") return { bg:"#fef3c7", color:"#92400e" };
    return { bg:"#f3f4f6", color:"#374151" };
  };

  if (selectedRun) {
    return <RunDetail run={selectedRun} agent={ag} onBack={function() { setSelectedRun(null); }} />;
  }

  return (
    <div style={{ padding:"0 32px 32px", maxWidth:960, margin:"0 auto" }}>
      <div style={{ padding:"20px 0 16px" }}>
        <button onClick={onBack} style={{ fontSize:12, padding:"6px 12px", borderRadius:6, border:"0.5px solid #e5e7eb", color:"#6b7280", cursor:"pointer", background:"#fff", display:"inline-flex", alignItems:"center", gap:5, marginBottom:14 }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 10.5L4.5 7 8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Platform Preview
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:44, height:44, borderRadius:"50%", background:c, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <span style={{ fontSize:14, fontWeight:500, color:"#fff" }}>{ag.initials}</span>
          </div>
          <div>
            <div style={{ fontSize:20, fontWeight:500, color:"#111827" }}>{ag.name}</div>
            <div style={{ fontSize:12, color:c }}>{ag.role}</div>
          </div>
          <span style={{ background:"#dcfce7", color:"#166534", borderRadius:10, padding:"3px 10px", fontSize:11, fontWeight:500, marginLeft:4 }}>Active</span>
          <span style={{ background:ag.light, color:c, borderRadius:6, padding:"3px 9px", fontSize:11 }}>{ag.area}</span>
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,minmax(0,1fr))", gap:12, marginBottom:20 }}>
        {ag.stats.map(function(s,i) {
          return (
            <div key={i} style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"16px", borderTop:"3px solid "+c }}>
              <div style={{ fontSize:11, color:"#9ca3af", marginBottom:4 }}>{s.label}</div>
              <div style={{ fontSize:22, fontWeight:500, color:c }}>{s.val}</div>
            </div>
          );
        })}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:16, marginBottom:20 }}>
        <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"18px 20px" }}>
          <div style={{ fontSize:13, fontWeight:500, color:"#111827", marginBottom:4 }}>Process overview</div>
          <div style={{ fontSize:11, color:"#9ca3af", marginBottom:24 }}>Current pipeline stage distribution</div>
          <div style={{ display:"flex", alignItems:"flex-start", padding:"0 10px" }}>
            {stages.map(function(st,i) {
              return (
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }}>
                  {i < stages.length-1 && <div style={{ position:"absolute", top:8, left:"50%", width:"100%", height:2, background: i<2 ? c+"55":"#e5e7eb", zIndex:0 }}></div>}
                  <div style={{ width:18, height:18, borderRadius:"50%", background: i<3 ? c : c+"44", border:"2px solid #fff", position:"relative", zIndex:1, marginBottom:8 }}></div>
                  <div style={{ fontSize:11, fontWeight:500, color:c, textAlign:"center", maxWidth:90 }}>{st}</div>
                  <div style={{ fontSize:11, color:"#9ca3af", marginTop:2 }}>{stageCounts[i]} requests</div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"18px 20px" }}>
          <div style={{ fontSize:13, fontWeight:500, color:"#111827", marginBottom:4 }}>Recent exceptions</div>
          <div style={{ fontSize:11, color:"#9ca3af", marginBottom:14 }}>Pending human review</div>
          {exceptions.map(function(ex,i) {
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:"#f9fafb", borderRadius:8, marginBottom:8 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background: ex.severity==="high" ? "#ef4444" : "#f59e0b", flexShrink:0 }}></div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:500, color:"#111827" }}>{ex.type}</div>
                  <div style={{ fontSize:11, color:"#9ca3af" }}>{ex.ref}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"18px 20px" }}>
        <div style={{ fontSize:13, fontWeight:500, color:"#111827", marginBottom:4 }}>Run history</div>
        <div style={{ fontSize:11, color:"#9ca3af", marginBottom:16 }}>Click any row to view process detail and conversation</div>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead>
            <tr style={{ borderBottom:"0.5px solid #e5e7eb" }}>
              {["Execution start","Status","Duration","Description","Reference"].map(function(h) {
                return <th key={h} style={{ padding:"8px 12px", textAlign:"left", fontSize:11, fontWeight:500, color:"#9ca3af", letterSpacing:"0.05em" }}>{h}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {runHistory.map(function(r,i) {
              var sc = statusColor(r.status);
              return (
                <tr key={i} onClick={function() { setSelectedRun(r); }}
                  style={{ borderBottom:"0.5px solid #e5e7eb", cursor:"pointer" }}
                  onMouseEnter={function(e) { e.currentTarget.style.background="#f9fafb"; }}
                  onMouseLeave={function(e) { e.currentTarget.style.background="transparent"; }}>
                  <td style={{ padding:"12px 12px", color:"#6b7280", whiteSpace:"nowrap" }}>{r.date}</td>
                  <td style={{ padding:"12px 12px" }}>
                    <span style={{ background:sc.bg, color:sc.color, borderRadius:10, padding:"3px 10px", fontSize:11, fontWeight:500 }}>{r.status}</span>
                  </td>
                  <td style={{ padding:"12px 12px", color:"#6b7280" }}>{r.duration}</td>
                  <td style={{ padding:"12px 12px", color:"#111827" }}>{r.desc}</td>
                  <td style={{ padding:"12px 12px" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <span style={{ color:c, fontWeight:500 }}>{r.ref}</span>
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

export default function Dashboard() {
  var [mainTab, setMainTab] = useState("catalog");
  var [previewView, setPreviewView] = useState("overview");
  var [selectedAgent, setSelectedAgent] = useState(null);
  var [view, setView] = useState("home");
  var [activeArea, setActiveArea] = useState(null);
  var [activeAgent, setActiveAgent] = useState(null);

  function goHome() { setView("home"); setActiveArea(null); setActiveAgent(null); }
  function goArea(area) { setActiveArea(area); setActiveAgent(null); setView("area"); }
  function goAgent(agent) { setActiveAgent(agent); setView("agent"); }

  var accentPurple = "#7c3aed";

  return (
    <div style={{ fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", minHeight:"100vh", background:"#f3f4f6" }}>

      {/* Top nav */}
      <div style={{ background:"#fff", borderBottom:"0.5px solid #e5e7eb", padding:"0 24px", display:"flex", alignItems:"center", height:52 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"0 16px 0 0", borderRight:"0.5px solid #e5e7eb", marginRight:16, flexShrink:0 }}>
          <div style={{ width:26, height:26, background:"linear-gradient(135deg,#7c3aed,#4338ca)", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1" y="1" width="4" height="4" rx="1" fill="white"/><rect x="8" y="1" width="4" height="4" rx="1" fill="white"/><rect x="1" y="8" width="4" height="4" rx="1" fill="white"/><rect x="8" y="8" width="4" height="4" rx="1" fill="white"/></svg>
          </div>
          <span style={{ fontSize:13, fontWeight:500, color:"#111827" }}>Beecker Agents</span>
        </div>

        <div style={{ display:"flex", gap:0, height:"100%" }}>
          {[["catalog","AI Agent Catalog"],["preview","Platform Preview"]].map(function(item) {
            var active = mainTab === item[0];
            return (
              <button key={item[0]} onClick={function() { setMainTab(item[0]); if (item[0]==="catalog") goHome(); }}
                style={{ height:"100%", padding:"0 18px", background:"none", border:"none", borderBottom: active ? "2px solid "+accentPurple : "2px solid transparent", cursor:"pointer", fontSize:13, fontWeight: active ? 500 : 400, color: active ? accentPurple : "#6b7280", transition:"all 0.15s" }}>
                {item[1]}
              </button>
            );
          })}
        </div>

        {mainTab === "catalog" && (
          <div style={{ marginLeft:"auto", display:"flex", gap:8, alignItems:"center" }}>
            {activeArea && (
              <span style={{ fontSize:12, color:"#9ca3af", marginRight:4 }}>
                <button onClick={goHome} style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, color:"#6b7280", padding:0 }}>Home</button>
                {" › "}
                <button onClick={function() { goArea(activeArea); }} style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, color:activeArea.color, padding:0 }}>{activeArea.label}</button>
                {view === "agent" && activeAgent ? " › " + activeAgent.name : ""}
              </span>
            )}
            {areas.map(function(a) {
              return (
                <button key={a.id} onClick={function() { goArea(a); }}
                  style={{ background: activeArea && activeArea.id===a.id ? a.color+"18":"none", border:"0.5px solid", borderColor: activeArea && activeArea.id===a.id ? a.border:"#e5e7eb", borderRadius:6, cursor:"pointer", padding:"4px 12px", fontSize:12, fontWeight:500, color: activeArea && activeArea.id===a.id ? a.color:"#6b7280" }}>
                  {a.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* CATALOG TAB */}
      {mainTab === "catalog" && (
        <div>
          {view === "home" && (
            <div style={{ padding:"40px 32px", maxWidth:960, margin:"0 auto" }}>
              <div style={{ marginBottom:28 }}>
                <div style={{ fontSize:11, fontWeight:500, color:"#9ca3af", letterSpacing:"0.08em", marginBottom:6 }}>BEECKER AUTONOMOUS AGENTS</div>
                <h1 style={{ margin:"0 0 8px", fontSize:26, fontWeight:500, color:"#111827" }}>AI Agent Catalog</h1>
                <p style={{ margin:0, fontSize:14, color:"#6b7280", maxWidth:520 }}>24 production-ready agents automating end-to-end enterprise processes. Select a process area to explore agents and view full capability sheets.</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
                {areas.map(function(a) {
                  return (
                    <button key={a.id} onClick={function() { goArea(a); }}
                      style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:12, padding:"24px 20px", textAlign:"left", cursor:"pointer" }}
                      onMouseEnter={function(e) { e.currentTarget.style.borderColor=a.border; }}
                      onMouseLeave={function(e) { e.currentTarget.style.borderColor="#e5e7eb"; }}>
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
                        <div style={{ color:a.color, background:a.light, borderRadius:10, width:46, height:46, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          {areaIcons[a.id]}
                        </div>
                        <span style={{ background:a.light, color:a.color, borderRadius:6, padding:"3px 10px", fontSize:11, fontWeight:500 }}>{a.agents.length} agents</span>
                      </div>
                      <div style={{ fontSize:17, fontWeight:500, color:"#111827", marginBottom:3 }}>{a.label}</div>
                      <div style={{ fontSize:12, color:a.color, marginBottom:8 }}>{a.full}</div>
                      <p style={{ margin:"0 0 14px", fontSize:13, color:"#6b7280", lineHeight:1.55 }}>{a.desc}</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:4 }}>
                        {a.agents.slice(0,4).map(function(ag) {
                          return <span key={ag.name} style={{ background:"#f9fafb", border:"0.5px solid #e5e7eb", borderRadius:5, padding:"2px 8px", fontSize:11, color:"#6b7280" }}>{ag.name}</span>;
                        })}
                        {a.agents.length > 4 && <span style={{ fontSize:11, color:"#9ca3af", padding:"2px 4px" }}>+{a.agents.length-4} more</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {view === "area" && activeArea && (
            <div style={{ padding:"28px 32px", maxWidth:980, margin:"0 auto" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
                <div style={{ color:activeArea.color, background:activeArea.light, borderRadius:10, width:42, height:42, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {areaIcons[activeArea.id]}
                </div>
                <div>
                  <div style={{ fontSize:10, color:"#9ca3af", fontWeight:500, letterSpacing:"0.07em" }}>{activeArea.label}</div>
                  <h2 style={{ margin:0, fontSize:19, fontWeight:500, color:"#111827" }}>{activeArea.full}</h2>
                </div>
              </div>
              <p style={{ margin:"0 0 22px", fontSize:13, color:"#6b7280" }}>{activeArea.desc} Click any agent for their full capability sheet.</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))", gap:12 }}>
                {activeArea.agents.map(function(ag) {
                  return (
                    <button key={ag.name} onClick={function() { goAgent(ag); }}
                      style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:12, padding:"16px 14px", textAlign:"left", cursor:"pointer" }}
                      onMouseEnter={function(e) { e.currentTarget.style.borderColor=activeArea.border; e.currentTarget.style.background=activeArea.light; }}
                      onMouseLeave={function(e) { e.currentTarget.style.borderColor="#e5e7eb"; e.currentTarget.style.background="#fff"; }}>
                      <div style={{ width:34, height:34, background:activeArea.color+"18", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:10 }}>
                        <span style={{ fontSize:11, fontWeight:500, color:activeArea.color }}>{ag.icon}</span>
                      </div>
                      <div style={{ fontSize:14, fontWeight:500, color:"#111827", marginBottom:2 }}>{ag.name}</div>
                      <div style={{ fontSize:11, color:activeArea.color, marginBottom:6 }}>{ag.module}</div>
                      <div style={{ fontSize:10, color:"#9ca3af", lineHeight:1.4 }}>Trigger: {ag.trigger}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {view === "agent" && activeAgent && activeArea && (
            <AgentDetail agent={activeAgent} area={activeArea} onBack={function() { goArea(activeArea); }} onHome={goHome} />
          )}
        </div>
      )}

      {/* PREVIEW TAB */}
      {mainTab === "preview" && previewView === "overview" && (
        <div style={{ padding:"40px 32px", maxWidth:960, margin:"0 auto" }}>
          <div style={{ marginBottom:28 }}>
            <div style={{ fontSize:11, fontWeight:500, color:"#9ca3af", letterSpacing:"0.08em", marginBottom:6 }}>BEECKER AUTONOMOUS AGENTS</div>
            <h1 style={{ margin:"0 0 8px", fontSize:26, fontWeight:500, color:"#111827" }}>Platform Preview</h1>
            <p style={{ margin:0, fontSize:14, color:"#6b7280", maxWidth:520 }}>Illustrative benchmark metrics, performance data, and a live look at deployed agents in action.</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16, marginBottom:28 }}>
            {[
              { id:"cycleChart", title:"Cycle time: manual vs automated", sub:"Days to complete, by process",
                legend:[{color:"#d1d5db",label:"Manual"},{color:"#7c3aed",label:"Automated"}] },
              { id:"savingsChart", title:"Estimated annual savings", sub:"USD thousands, by process area",
                legend:[{color:"#7c3aed",label:"H2R"},{color:"#6d28d9",label:"P2P"},{color:"#4338ca",label:"O2C"}] },
              { id:"roiChart", title:"Cumulative ROI over 12 months", sub:"Return multiplier from go-live",
                legend:[{color:"#4338ca",label:"ROI (x)"}] },
            ].map(function(ch) {
              return (
                <div key={ch.id} style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"16px" }}>
                  <div style={{ fontSize:12, fontWeight:500, color:"#111827", marginBottom:2 }}>{ch.title}</div>
                  <div style={{ fontSize:11, color:"#9ca3af", marginBottom:10 }}>{ch.sub}</div>
                  <div style={{ display:"flex", gap:12, marginBottom:10 }}>
                    {ch.legend.map(function(l) {
                      return <span key={l.label} style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, color:"#6b7280" }}><span style={{ width:10, height:10, borderRadius:2, background:l.color, display:"inline-block" }}></span>{l.label}</span>;
                    })}
                  </div>
                  <div style={{ position:"relative", width:"100%", height:180 }}><canvas id={ch.id}></canvas></div>
                </div>
              );
            })}
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,minmax(0,1fr))", gap:12, marginBottom:36 }}>
            {[
              { value:"78%", label:"Reduction in manual processing time", sub:"Across H2R, P2P, O2C", color:"#7c3aed" },
              { value:"$2.4M", label:"Est. annual savings per deployment", sub:"10,000+ transactions/month", color:"#6d28d9" },
              { value:"3.8x", label:"ROI within first 12 months", sub:"Combined H2R, P2P, O2C", color:"#4338ca" },
              { value:"62%", label:"Lower cost-per-transaction", sub:"vs fully manual baseline", color:"#4338ca" },
            ].map(function(k,i) {
              return (
                <div key={i} style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:10, padding:"16px 16px 14px", borderTop:"3px solid "+k.color }}>
                  <div style={{ fontSize:24, fontWeight:500, color:k.color, marginBottom:4 }}>{k.value}</div>
                  <div style={{ fontSize:12, color:"#111827", lineHeight:1.45, marginBottom:5 }}>{k.label}</div>
                  <div style={{ fontSize:11, color:"#9ca3af" }}>{k.sub}</div>
                </div>
              );
            })}
          </div>

          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:500, color:"#9ca3af", letterSpacing:"0.08em", marginBottom:4 }}>SAMPLE DEPLOYED AGENTS</div>
            <p style={{ margin:"0 0 16px", fontSize:13, color:"#6b7280" }}>Click any agent to view their live monitoring dashboard.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
            {[
              { name:"Daniel", role:"Invoice Processing & 3-Way Match", area:"P2P", color:"#6d28d9", light:"#f5f0ff", border:"#c4b5fd", initials:"DA",
                stats:[{label:"Processing now",val:"15"},{label:"Total processed",val:"248"},{label:"Accuracy",val:"99.8%"},{label:"Avg time",val:"30s"}],
                status:"Active", exceptions:2 },
              { name:"Isa", role:"Selection, Hiring & Onboarding", area:"H2R", color:"#7c3aed", light:"#f5f3ff", border:"#c4b5fd", initials:"IS",
                stats:[{label:"Active onboardings",val:"7"},{label:"Completed this mo.",val:"34"},{label:"On-time rate",val:"97.1%"},{label:"Avg time",val:"2.1d"}],
                status:"Active", exceptions:1 },
              { name:"Nina", role:"Accounts Receivable", area:"O2C", color:"#4338ca", light:"#eef2ff", border:"#a5b4fc", initials:"NI",
                stats:[{label:"Open invoices",val:"42"},{label:"Collected this mo.",val:"$1.2M"},{label:"DSO",val:"18d"},{label:"Overdue flags",val:"3"}],
                status:"Active", exceptions:3 },
            ].map(function(ag) {
              return (
                <button key={ag.name} onClick={function() { setSelectedAgent(ag); setPreviewView("agent"); }}
                  style={{ background:"#fff", border:"0.5px solid #e5e7eb", borderRadius:12, padding:0, textAlign:"left", cursor:"pointer", overflow:"hidden" }}
                  onMouseEnter={function(e) { e.currentTarget.style.borderColor=ag.border; }}
                  onMouseLeave={function(e) { e.currentTarget.style.borderColor="#e5e7eb"; }}>
                  <div style={{ background:ag.light, padding:"16px 18px", display:"flex", alignItems:"center", gap:12, borderBottom:"0.5px solid #e5e7eb" }}>
                    <div style={{ width:44, height:44, borderRadius:"50%", background:ag.color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <span style={{ fontSize:14, fontWeight:500, color:"#fff" }}>{ag.initials}</span>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:15, fontWeight:500, color:"#111827" }}>{ag.name}</div>
                      <div style={{ fontSize:11, color:ag.color }}>{ag.role}</div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                      <span style={{ background:"#dcfce7", color:"#166534", borderRadius:10, padding:"2px 9px", fontSize:10, fontWeight:500 }}>{ag.status}</span>
                      <span style={{ background:ag.light, color:ag.color, borderRadius:6, padding:"2px 7px", fontSize:10 }}>{ag.area}</span>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0 }}>
                    {ag.stats.map(function(s,i) {
                      return (
                        <div key={i} style={{ padding:"12px 16px", borderRight: i%2===0 ? "0.5px solid #e5e7eb" : "none", borderBottom: i<2 ? "0.5px solid #e5e7eb" : "none" }}>
                          <div style={{ fontSize:10, color:"#9ca3af", marginBottom:3 }}>{s.label}</div>
                          <div style={{ fontSize:16, fontWeight:500, color:ag.color }}>{s.val}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ padding:"10px 18px", borderTop:"0.5px solid #e5e7eb", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontSize:11, color:"#9ca3af" }}>{ag.exceptions} exception{ag.exceptions!==1?"s":""} pending review</span>
                    <span style={{ fontSize:11, color:ag.color, fontWeight:500 }}>View dashboard →</span>
                  </div>
                </button>
              );
            })}
          </div>

          <ChartRenderer />
        </div>
      )}

      {mainTab === "preview" && previewView === "agent" && selectedAgent && (
        <AgentMonitor agent={selectedAgent} onBack={function() { setPreviewView("overview"); }} />
      )}
    </div>
  );
}
