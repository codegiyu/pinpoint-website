import { Article } from '@/components/general/Article';
import { PageSideDecoration } from '@/components/general/PageSideDecoration';
import { MainLayout } from '@/components/layout/MainLayout';
import { FormPageHeadingSection } from '@/components/sections/shared/CommonHero';
import { CTA } from '@/components/sections/shared/Cta';

export default function LegalNotice() {
  return (
    <MainLayout pageName="Privacy Policy">
      <FormPageHeadingSection caption="Policy" heading="Privacy Policy" texts={[]} />
      <section className="w-full pt-0 pb-24">
        <div className="form-page-container">
          <Article paragraphs={paragraphs} />
        </div>
      </section>
      <CTA variant="gray" />
      <PageSideDecoration caption="Privacy policy" />
    </MainLayout>
  );
}

const paragraphs: string[][] = [
  [
    'The following Terms and Conditions of Service apply to all products and services provided \
    by as PINPOINT Ltd (hereinafter referred to as PINPOINT) and in the event of any dispute \
    are governed by the laws of NIGERIA.',
    'All work is carried out by as PINPOINT on the understanding that the client has agreed \
    to our terms and conditions.',
    'Copyright is retained by as PINPOINT on all design work including words, pictures, ideas, \
    visuals and illustrations unless specifically released in writing and after all costs have \
    been settled. If a choice of designs is presented and one is chosen for your project, only \
    that solution is deemed to be given by us as fulfilling the contract. All other designs \
    remain the property of as PINPOINT, unless specifically agreed in writing.',
  ],
  [
    'Project Acceptance',
    'At the time of proposal as PINPOINT will provide the customer with a written estimate or quotation by email. These Terms and Conditions can be read at any time on the as PINPOINT ,social handles and website. A copy of the written estimate or quotation is to be signed and dated by the customer to indicate acceptance and should be returned to as PINPOINT. Alternatively, the client may send an official purchase order in reply to the estimate or quotation which binds the client to accept our terms and conditions, or an email acknowledging acceptance of the quotation. For the avoidance of doubt, the as PINPOINT Terms & Conditions are what govern the job, not any conditions on the customer’s purchase order.',
  ],
  [
    'Design Charges',
    'Charges for design services to be provided by as PINPOINT will be set out in the written estimate or quotation that is provided to the customer. At the time of the customer’s signed acceptance of this estimate or quotation, indicating acceptance of the Terms & Conditions, a non-refundable payment of 50% of the quoted fee will become immediately due. Unless agreed otherwise with the Client, all design services require an advance payment of a minimum of fifty (50) percent of the project quotation total before the work commences or is supplied to the Client for review. The remaining fifty (50) percent of the project quotation total will be due upon completion of the work prior to upload to the server or release of materials.',
  ],
  [
    'Source Files',
    'We will supply proofs and PDF files as appropriate for printing, or other graphic files as detailed in the job scope or request. Charges for design work do not cover the release of our copyright design source files, including but not restricted to indd, psd, AI, png, fla or other source files or raw code; if the Client requires these files for transfer to an in-house or other designer, they will be subject to a separate quotation or ‘buy-out’ charge.',
  ],
  [
    'Charges for Other Services',
    'Charges for any additional services requested during the project that are over and above the estimated time or out of scope, will become fully payable (100% of the quoted amount) at the time of estimate or quotation acceptance.',
  ],
  [
    'Payment',
    'The customer will be provided with an Approval Form or Proof Email, and an Invoice prior to final publication. At this time the remainder of the amount due will become payable and the customer will also be required to sign and return the Approval Form or signify approval by email to as PINPOINT . Any invoice queries must be submitted by email within 14 days of the invoice date. Accounts which remain outstanding for 30 days after the date of invoice, will incur late payment interest charge at the Bank of CBN Base Rate plus 8% on the outstanding amount from the date due until the date of payment. Payments may be made by online transfer, credit card (Visa, Mastercard) or Debit Card. Payments made by cheque must be previously agreed and may be subject to an administration charge. Cheques should not be sent in regular mail unless sent recorded delivery. Publication and/or release of work done by as PINPOINT on behalf of the client, may not take place before cleared funds have been received. Returned cheques will incur an additional fee of £50 per returned cheque. as PINPOINT reserves the right to consider an account to be in default in the event of a returned cheque.',
  ],
  [
    'Default',
    'An account shall be considered default if it remains unpaid for 30 days from the date of invoice, or following a returned cheque. as PINPOINT shall be entitled to as PINPOINT s and/or the customer’s material from any and all computer systems, until the amount due has been fully paid. This includes any and all unpaid monies due for services, including, but not limited to, hosting, domain registration, search engine submission, design and maintenance, sub-contractors, printers, photographers and libraries. Removal of such materials does not relieve the customer of its obligation to pay the due amount. Customers whose accounts become default agree to pay all as PINPOINT ‘s reasonable legal and accounting expenses and third party collection agency fees in the enforcement of the debt and these Terms and Conditions.',
  ],
  [
    'Copyrights and Trademarks',
    'By supplying text, images and other data to as PINPOINT for inclusion in the customer’s website or other medium, the customer declares that it holds the appropriate copyright and/or trademark permissions. The ownership of such materials will remain with the customer, or rightful copyright or trademark owner. Any artwork, images, or text supplied and/or designed by as PINPOINT on behalf of the customer, will remain the property of as PINPOINT and/or its suppliers unless otherwise agreed in writing. A licence for use of the copyright material is granted to the customer solely for the project defined in the scope or request and not for any other purpose. The customer may request in writing from as PINPOINT, the necessary permission to use materials (for which as PINPOINT holds the copyright) in forms other than for which it was originally supplied, and as PINPOINT may, at its discretion, grant this and may charge for the additional usage. Such permission must be obtained in writing before any of the aforesaid artwork, images, text, or other data is used. Any software, code, plugin or other third party material used in a web or digital project remains the property of the creator and any ongoing licence fees or fees for upgrades are the responsibility of the client, not as PINPOINT. By supplying images, text, or any other data to as PINPOINT, the customer grants as PINPOINT permission to use this material freely in the pursuit of the design. Should as PINPOINT, or the customer supply an image, text, audio clip or any other file for use in a website, multimedia presentation, print item, exhibition, advertisement or any other medium believing it to be copyright and royalty free, which subsequently emerges to have such copyright or royalty usage limitations, the customer will agree to allow as PINPOINT to remove and/or replace the file on the site. The customer agrees to fully indemnify and hold as PINPOINT free from harm in any and all claims resulting from the customer in not having obtained all the required copyright, and/or any other necessary permissions',
  ],
  [
    'Alterations',
    'The customer agrees that changes required over and above the estimated work, or in addition to the agreed scope, or where the client makes changes to the supplied copy or changes required to be carried out after acceptance of the draft design, will be liable to a separate charge. The customer also agrees that as PINPOINT holds no responsibility for any amendments made by any third party, before or after a design is published.',
  ],
  [
    'Licensing',
    'Any design, copywriting, drawing, idea or code created for the customer by as PINPOINT, or any of its contractors, is licensed for use by the client on a one-time only basis and may not be modified, re-used, or re-distributed in any way or form without the express written consent of as PINPOINT and any of its relevant sub-contractors. All design work – where there is a risk that another party make a claim, should be registered by the client with the appropriate authorities prior to publishing or first use or searches and legal advice sought as to its use. as PINPOINT will not be held responsible for any and all damages resulting from such claims. Glazier Design is not responsible for any loss, or consequential loss, non-delivery of products or services, of whatever cause. The customer agrees not to hold as PINPOINT responsible for any such loss or damage. Any claim against as PINPOINT shall be limited to the relevant fee(s) paid by the customer.',
  ],
  [
    'Data Formats',
    'The client agrees to as PINPOINT definition of acceptable means of supplying data to the company. Text is to be supplied to as PINPOINT in electronic format as standard text (.txt), MS Word (.docx) or via e-mail / FTP or shared folder. Images which are supplied in an electronic format are to be provided in a format as prescribed by as PINPOINT via e-mail / FTP. Images must be of a quality suitable for use without any subsequent image processing, and as PINPOINT will not be held responsible for any image quality which the client later deems to be unacceptable. as PINPOINT cannot be held responsible for the quality of any images which the client wishes to be scanned from printed materials. Additional expenses may be incurred for any necessary action, including, but not limited to, photography and art direction, photography searches, media conversion, digital image processing, or data entry services, colour correction and alteration of images.',
  ],
  [
    'Design Project Duration',
    'Any indication given by as PINPOINT of a design project’s duration is to be considered by the customer to be an estimation. PINPOINT cannot be held responsible for any project over-runs, whatever the cause. Estimated project duration should be deemed to be from the date that cleared funds are received by as PINPOINT for the initial payment or by date confirmed in writing by as PINPOINT.',
  ],
  [
    'Rights of Access for Website Construction',
    'The client agrees to allow as PINPOINT all necessary access to computer systems and other locations, as required, in order to complete a website project and until all due funds are cleared, including the necessary read/write permissions, usernames and passwords. The customer also agrees to allow as PINPOINT access to any computer systems, usernames and passwords required to remove data and/or sites for failure to comply with these Terms and Conditions. The customer agrees to supply as PINPOINT with all necessary materials, electronic, or otherwise, required to create and complete the project, and to supply them in a timely manner.',
  ],
  [
    'Design Project Completion',
    'PINPOINT considers the design project complete upon receipt of the customer’s signed Approval form or signoff email. Other services such as printing, display panel production, filmwork, website uploading, publishing etc either contracted on the client’s behalf constitute a separate project and can be treated as a separate charge.',
  ],
  [
    'Website design only',
    'as PINPOINT require that a template is approved by the customer before coding of a site commences. Once the template(s) for the web site are approved by the customer, coding will commence; any changes to navigation items, colours, structure or content that require changes to the template will incur an additional charge. Once web design is complete, as PINPOINT will provide the customer with the opportunity to review the resulting work. as PINPOINT will make one set of minor changes at no extra cost within 14 days of the start of the review period. Minor changes include small textual changes and small adjustments to placement of items on the page. It does not include changes to images, colour schemes or any navigation features. Any minor changes can be notified to as PINPOINT by e-mail. as PINPOINT DESIGN will consider that the client has accepted the original draft, if no notification of changes is received in writing from the customer, within 14 days of the start of the review period.',
  ],
  [
    'Hosting websites',
    'PINPOINT offers a limited hosting services through an out-sourced virtual server. PINPOINT does not guarantee continuous service and will accept no liability for loss of service, whatever the cause. PINPOINT may request that clients change the type of hosting account used if that account is deemed by PINPOINT to be unacceptable because of poor service, lack of bandwidth or in any other way insufficient to support the website. Fees for hosting on PINPOINT virtual server are due at the commencement of any period of service and are non-refundable. Fees due to third party hosting organisations are the responsibility of the client PINPOINT are not liable for their payment, nor for the renewal of domain names, which are the sole responsibility of the customer / domain owner.',
  ],
  [
    'Domain Registration',
    'PINPOINT Design cannot guarantee the availability of any domain name. Where PINPOINT is to register a domain name on behalf of a client it will endeavour to do so but the client should not assume a successful registration.',
  ],
  [
    'Search Engine Submission',
    'Due to the infinite number of considerations that search engines use when determining a site’s ranking, PINPOINT cannot guarantee any particular placement. Acceptance by any search engine cannot be guaranteed and when a site is accepted, the time it takes to appear in search results varies from one search engine to another. Rankings will also vary as new sites are added. PINPOINT recommend that customers use a professional SEO company and are happy to provide details of such companies, but accept no responsibility for their services.',
  ],
  [
    'Design Credits',
    'The customer agrees to allow PINPOINT to place a small credit on printed material exhibition displays, advertisements and/or a link to PINPOINT Design own website on the customer’s website. This will usually be in the form of a small logo or line of text placed towards the bottom of the page. The customer also agrees to allow PINPOINT to place websites and other designs, along with a link to the client’s site on PINPOINT’s own website for demonstration purposes and to use any designs in its own publicity and portfolios.',
  ],
  [
    'Rights of Refusal',
    'PINPOINT will not include in its designs, any text, images or other data which it deems to be immoral, offensive, obscene or illegal. All advertising material must conform to all standards laid down by all relevant advertising standards authorities. PINPOINT also reserves the right to refuse to include submitted material without giving reason. In the situation where any images and/or data that PINPOINT does include in all good faith, and subsequently discovers is in contravention to such Terms and Conditions, the customer is obliged to allow PINPOINT to remove the contravention without hindrance, or penalty. PINPOINT is to be held in no way responsible for any such data being included.',
  ],
  [
    'Cancellation',
    'Cancellation of orders may be made initially by telephone contact, or e-mail, however, following this, PINPOINT will need formal notification in writing to the company’s postal address. The client will then be invoiced for all work completed over and above the non-refundable deposit that will have been made at the time of first ordering. The balance of monies due must be paid within 30 days. Please note: any cancellation which is not formally confirmed in writing and received by PINPOINT within 14 days of such instruction being issued, will be liable for the full quoted cost of the project.',
  ],
  [
    'Disclaimer',
    'PINPOINT makes no warranties of any kind, express or implied, for any and all products and/or services that it supplies. PINPOINT will not be held responsible for any and all damages resulting from products and/or services it supplies. PINPOINT or services, of whatever cause. While we take reasonable steps to investigate the materials we recommend, we accept no responsibility for the performance or quality of materials or any consequential loss arising from their failure. The customer agrees not to hold PINPOINT responsible for any such loss or damage. Any claim against PINPOINT shall be limited to the relevant fee(s) paid by the customer. PINPOINT reserves the right to use the services of sub-contractors, agents and suppliers and any work, content, services and usage is bound by their Terms and Conditions. PINPOINT will not knowingly perform any actions to contravene these and the client also agrees to be so bound. PINPOINT and its clients agree to comply with Printers Terms and Conditions which include disclaimers for non-completion on time and the flexibility to supply quantities within 10% of the total ordered. PINPOINT recommend that if an exact quantity is required, then 10% extra is added to the quantity and extra time made available should the job be delayed.',
  ],
  [
    'General',
    'These Terms and Conditions supersede any previous Terms and Conditions distributed in any form. PINPOINT reserves the right to change any rates and any of the Terms and Conditions at any time and without prior notice.',
  ],
  [
    'Acceptance of Terms and Conditions and Quotation',
    'The placement of an order for design and/or any other services offered by PINPOINT, by email, verbally or in writing, is deemed to be acceptance of these terms and conditions, which are freely available at www.pinpoint.ng .',
  ],
];
