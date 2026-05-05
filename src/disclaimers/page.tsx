"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
export default function Disclosures() {
  const [content, setContent] = useState("Disclaimer");

  const links = ["Disclaimer", "Privacy Notice"];

  const returnContent = () => {
    switch (content) {
      case "Disclaimer":
        return (
          <>
            <h2 className="text-white">Disclaimer</h2>
            <hr style={{ margin: 0, marginBottom: 50, color: "white" }} />
            <p className="text-sm font-mulish text-white mb-4">
              This website is operated by Alamut Investment Management LLP, a
              limited liability partnership registered in England and Wales
              (Registered number: OC451305) and with its principal office at
              5-10 Bolton Street, London, England, W1J 8BA (“
              <strong>Alamut</strong>”). Alamut is not currently authorised or
              regulated by the Financial Conduct Authority (“
              <strong>FCA</strong>”) in the United Kingdom or by any other
              regulatory body in any other jurisdiction. Therefore, Alamut may
              not arrange deals or conduct any other regulated activity in the
              UK or in any other jurisdiction. Alamut has applied to obtain FCA
              authorisation to provide investment management activities.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              The information on this website is only directed at and available
              to persons who are professional clients and eligible
              counterparties for the purposes of the rules and guidance of the
              Financial Conduct Authority of the United Kingdom (the “
              <strong>FCA Rules</strong>”). It should only be accessed by
              persons located in a jurisdiction or country where access to such
              information is not contrary to local law and regulation.
              Information on this website must not be relied or acted upon by
              any other persons.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              The information on this website is provided for information
              purposes only. No such information should be construed as a
              recommendation to buy or sell any product or investment, or to
              take any other course of action, or as advice on the suitability
              or otherwise of that product or investment for any person.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              The information on this website does not constitute an offer or
              solicitation of any product or investment in any jurisdiction in
              which it is not authorised, or to any person to whom such offer or
              solicitation is unlawful. All persons accessing this website do so
              on an unsolicited basis and on their own initiative. It is the
              responsibility of users accessing this website to inform
              themselves of, and act in accordance with, the legal and
              regulatory requirements in their jurisdiction of citizenship,
              residence or domicile. Alamut disclaims all responsibility if
              persons access the website, or the information on it, contrary to
              such legal and regulatory requirements.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              Nothing contained on this website constitutes investment, legal,
              tax or other advice nor is it to be relied on in making an
              investment or other decision.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              All information referred to on this website is subject to change
              without notice and may not necessarily be up-to-date. Although
              Alamut has taken reasonable care that the information on this
              website is accurate at the time of publication, it makes no
              representation or warranty (including liability towards third
              parties) express or implied, as to its accuracy, reliability or
              completeness. If users rely on material on this website, they do
              so at their own risk. Alamut expressly disclaims any duty of care
              it might otherwise owe to any person relying on material on this
              website.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              Past performance is not a guide to future performance and the
              value of investments and any income derived from them can go down
              as well as up.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              In order to enhance security and to provide customised
              information, this website uses cookies, which are small data
              structures used to store data on personal computers and to return
              information to the websites. These cookies are used to collect
              information about how visitors use this site. Alamut uses the
              information to compile reports and to help improve the site. By
              accessing this site you expressly accept our policy on the use of
              cookies.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              Alamut is not responsible for any hypertext links on this website
              redirecting users to other internet locations or for the content,
              advice and information provided by the authors of such internet
              locations. Any further links provided at any such locations are
              not checked, analysed, monitored or endorsed by Alamut and Alamut
              accepts no responsibility for them.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              In general, it is up to the user to take the necessary precautions
              to ensure that the selected site is not infected with viruses, or
              similar. Under no circumstances is Alamut to be held responsible
              for direct or indirect damage resulting from the use of this
              website or other sites linked to it.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              All content on this website is the intellectual property of Alamut
              and is subject to copyright with all rights reserved. It may not
              be copied, shared, sold, licensed, posted, reproduced or changed
              without Alamut’s permission.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              Alamut collects, processes, and uses personal data obtained
              through this website in accordance with our privacy policy. For
              further information on our data practices, including the types of
              data we collect, how we use it, and your rights as a data subject,
              please see our Privacy Notice.
            </p>
          </>
        );

      case "Privacy Notice":
        return (
          <>
            <h2 className="text-white">Privacy Notice</h2>
            <hr style={{ margin: 0, marginBottom: 50, color: "white" }} />
            <p className="text-sm font-mulish text-white mb-4">
              This Privacy Notice for Alamut Investment Management LLP (“
              <strong>we</strong>”, “<strong>us”</strong> or{" "}
              <strong>“our”</strong>) aims to give visitors to our website,
              current, prospective and former clients and investors in
              investment products to which we provide investment management or
              investment advisory services, and other contacts who interact with
              us, or where any such person is not an individual, such person’s
              individual directors, officers, employees and/or owners (“
              <strong>you</strong>”, or “<strong>your</strong>”) information
              about the personal data we may collect, how we collect it, what we
              use it for and with whom we share it. Where the client, investor
              or other contact is not an individual please provide a copy of
              this Privacy Notice to those individual directors, officers,
              employees and/or owners whose personal data we may process.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              “Personal data” means any information relating to you, but does
              not include data where you can no longer be identified from it
              such as anonymised aggregated data.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              We will be a data controller in respect of your relationship with
              us as a client, investor, or other contact. A data controller is
              responsible for deciding how to hold and use personal data about
              you. We may process your personal data ourselves or through others
              acting as data processors on our behalf.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              We may provide supplemental privacy notices on specific occasions
              when we are collecting or processing personal data about you so
              that you are fully aware of how and why we are using your personal
              data. These supplemental notices should be read together with this
              Privacy Notice.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              If you have any questions about this Privacy Notice you can
              contact{" "}
              <a
                className="text-accent font-bold"
                href="mailto:privacy@alamut-im.com"
              >
                privacy@alamut-im.com
              </a>
              .
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              <strong>
                What information do we collect about you and what do we use it
                for?
              </strong>
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              Personal data held by us or on our behalf depends on the context
              of your relationship or interaction with us but may include, but
              is not necessarily limited to, your name, residential address,
              place of business, email address, other contact details, corporate
              contact information, signature, nationality, country of residence,
              place of birth, date of birth, tax identification, tax
              jurisdiction, employment and job history, education details,
              regulatory status, credit history, correspondence records, call
              recordings, passport number, bank account details, certain
              financial information contained within KYC documents, source of
              funds and details relating to your investment activity or
              preferences, information about how you use our website, other
              technical data (such as your IP address, browser type and version,
              time zone setting and location).
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              The purposes for which we may collect, store and use personal data
              about you and our ‘lawful basis’ for processing such data are set
              out in the table below. The law specifies certain ‘lawful bases’
              for which we are allowed to use your personal data.
            </p>
            <div className="grid grid-cols-2 divide-x-[1px] divide-y-[1px]  divide-black border-r-[1px] border-black border-b-[1px] mb-4">
              <strong>
                <p className="text-sm font-mulish text-white p-2 border-l-[1px] border-t-[1px] border-black">
                  Purpose
                </p>
              </strong>
              <strong>
                <p className="text-sm font-mulish text-white p-2">
                  Lawful basis for processing
                </p>
              </strong>

              <p className="text-sm font-mulish text-white p-2">
                Where you are a client or investor, to undertake pre-investment
                steps including but not limited to:
                <br />
                - determining your eligibility to invest or hold a managed
                account with us;
                <br />
                - required due diligence (including a background check); and
                <br />- ascertaining your investment preferences.
              </p>
              <p className="text-sm font-mulish text-white p-2">
                In order to take steps prior to the contract between you and
                us/the fund in which you may invest, compliance with applicable
                legal obligations and our legitimate interests in establishing
                your preferred investment strategies and complying with our
                legal and regulatory obligations.
              </p>

              <p className="text-sm font-mulish text-white p-2">
                To undertake business development and marketing activities in
                relation to making suggestions and recommendations to you about
                products or services that may be of interest to you. This may
                include direct electronic marketing.
              </p>
              <p className="text-sm font-mulish text-white p-2">
                Our legitimate interests in promoting our products and services
                and growing our business. We only send direct electronic
                marketing where individuals have consented to this or as
                otherwise permitted by the law. Individuals can opt-out of
                receiving such messages at any time by using the opt-out
                mechanisms that may be available in those messages or by
                contacting us at{" "}
                <a
                  className="text-accent font-bold"
                  href="mailto:privacy@alamut-im.com"
                >
                  privacy@alamut- im.com
                </a>
              </p>

              <p className="text-sm font-mulish text-white p-2">
                Where you appoint us to manage an account on your behalf, to
                facilitate the opening of your account, the management and
                administration of your account on an on-going basis as
                considered necessary or appropriate for the performance of your
                contract with us, including without limitation the processing of
                subscription, redemption, conversion and transfer requests and
                the payment of distributions.
              </p>
              <p className="text-sm font-mulish text-white p-2">
                The performance of your contract with us.
              </p>

              <p className="text-sm font-mulish text-white p-2">
                Where you appoint us to manage an account on your behalf, to
                carry out anti-money laundering checks and related actions
                considered appropriate to meet any legal obligations relating to
                the prevention of fraud, money laundering, terrorist financing,
                bribery, corruption, tax evasion and the provision of financial
                and other services to persons who may be subject to economic or
                trade sanctions, on an on-going basis, in accordance with our
                anti-money laundering procedures.
              </p>
              <p className="text-sm font-mulish text-white p-2">
                Compliance with applicable legal obligations and our legitimate
                interests in complying with law and regulation applicable to us
                and our processors.
              </p>

              <p className="text-sm font-mulish text-white p-2">
                Where you appoint us to manage an account on your behalf, to
                report tax related information to tax authorities.
              </p>
              <p className="text-sm font-mulish text-white p-2">
                Compliance with applicable legal obligations and our legitimate
                interests in complying with our legal and regulatory
                obligations.
              </p>

              <p className="text-sm font-mulish text-white p-2">
                To process and verify instructions, undertake quality and
                business analysis, comply with applicable laws and regulations,
                and maintain our rights and responsibilities directly or through
                third party delegates.
              </p>
              <p className="text-sm font-mulish text-white p-2">
                Our legitimate interests in maintaining relations with our
                clients and in conducting our
              </p>

              <p className="text-sm font-mulish text-white p-2">
                In doing so, we record and monitor calls and other
                communications.
              </p>
              <p className="text-sm font-mulish text-white p-2">
                Business in a proper manner.
                <br />
                <br />
                Compliance with applicable legal obligations and our legitimate
                interests in complying with our legal and regulatory
                obligations.
              </p>

              <p className="text-sm font-mulish text-white p-2">
                To maintain our records and, where you appoint us to manage an
                account on your behalf, to carry out fee calculations.
              </p>
              <p className="text-sm font-mulish text-white p-2">
                Where applicable, the performance of your contract with us as a
                client.
                <br />
                <br />
                Our legitimate interests in maintaining relations with our
                clients and in conducting our business in a proper manner.
              </p>

              <p className="text-sm font-mulish text-white p-2">
                Where you appoint us to manage an account on your behalf, to
                provide client relations in respect of your account including
                provision of periodic reporting, seeking consents for changes to
                terms and for other corporate governance purposes.
              </p>
              <p className="text-sm font-mulish text-white p-2">
                The performance of your contract with us as a client.
                <br />
                <br />
                Compliance with applicable legal obligations and our legitimate
                interests in complying with our legal and regulatory
                obligations.
              </p>

              <p className="text-sm font-mulish text-white p-2 ">
                To administer and maintain our website and record, monitor and
                analyse your use of our website and whether you open emails we
                have sent to you.
              </p>
              <p className="text-sm font-mulish text-white p-2  ">
                Either your consent (for example, when we require your consent
                for any optional cookies that we use) or our legitimate
                interests in studying how our website is used, keeping our
                website updated and relevant, to develop our business and inform
                our marketing strategy.
              </p>
            </div>
            <p className="text-sm font-mulish text-white mb-4">
              In addition to the uses above, please note that we may also
              process your information where we are required by law to do so or
              if we reasonably believe that it is necessary to protect our
              rights and/or to comply with judicial or regulatory proceedings, a
              court order or other legal process.
            </p>
            <p className="text-sm font-mulish text-white mb-4 underline">
              Special categories of personal data
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              There are more limited bases for processing special category
              personal data. This is personal data which reveals or contains
              racial or ethnic origin, political opinions, religious and
              philosophical beliefs, trade union membership, genetic data,
              biometric data, health data, sex life and sexual orientation.
              Similarly, there are fewer bases for processing criminal
              convictions and offences data.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              We do not intend to actively collect any such data about you.
              Whilst we will use reasonable efforts to limit our holding of such
              data, please be aware that we may hold such data incidentally. For
              example, where:
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              - you volunteer such data to us or one of our processors, such as
              if you send us an email containing such data;
              <br />- documents gathered for legal / regulatory purposes
              containing such data, such as a passport copy which references
              ethnic origin or a due diligence search from public sources which
              includes such data.
            </p>
            <p className="text-sm font-mulish text-white mb-4 underline">
              What if you do not provide the personal data requested?
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              Unless and until you make a decision to invest or otherwise engage
              in a business transaction with us or invest in one of our
              investment products (a “<strong>Fund</strong>”) (at which point we
              will send you a copy of any relevant privacy notice) you are not
              required to provide us with any information.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              If you are invested with us or in a Fund, in some circumstances,
              if you do not provide us or the Fund with certain information when
              requested, we and/or such Fund may be limited or restricted in our
              ability to deal with you and may in some cases be prevented from
              complying with our legal obligations. Where we or a Fund requires
              your personal information to comply with anti-money laundering or
              other legal requirements, failure to provide this information
              means that we or the Fund (as the case may be) may not be able to
              accept you or retain you as an investor. We will let you know if
              any particular data is required when we request it.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              Please also note that our website may automatically collect
              certain technical data (further details on this are in the “How do
              we collect this information?” section).
            </p>
            <p className="text-sm font-mulish text-white mb-4 underline">
              Change of purpose
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              We will only use your personal data for the purposes for which we
              collected it (as identified above in the ‘
              <span className="italic">Purpose</span>’ column), unless we
              reasonably consider that we need to use it for another reason
              which is compatible with the original purpose. If we need to use
              your personal data for an unrelated purpose, we will notify you
              and we will explain the legal basis which allows us to do so.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              <strong>How do we collect this information?</strong>
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              We typically collect personal data about you when you provide
              information to us or others acting on our behalf when
              communicating or transacting with us in writing, electronically,
              or by phone. For instance, applications, requests for product
              documentation or other forms of literature, your transactions and
              account positions. As you interact with our website, we may
              automatically collect technical data about your equipment,
              browsing actions and patterns. We collect this data by using
              cookies and other similar technologies.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              In addition, we may receive personal information about you from
              third parties, such as:
            </p>
            <ul className="text-sm font-mulish text-white mb-4 list-disc pl-6">
              <li>public sources or information vendors;</li>
              <li>your bank;</li>
              <li>
                your legal, financial, tax or other professional advisers;
              </li>
              <li>
                introducers, distributors or other intermediaries who market or
                provide services to you.
              </li>
            </ul>
            <p className="text-sm font-mulish text-white mb-4">
              <strong>With whom will we share your information?</strong>
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              We may share your personal data with a third party for the
              purposes described above where this is required by law, where it
              is necessary to perform our contract with you, or where we have
              another legitimate interest in doing so.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              We may need to share your personal data with:
            </p>
            <ul className="text-sm font-mulish text-white mb-4 list-disc pl-6">
              <li>
                other entities within our group as part of our regular reporting
                activities in company performance, in the context of a business
                reorganisation or group restructuring exercise or for assistance
                in relation to marketing and business development;
              </li>
              <li>your bank;</li>
              <li>
                your legal, financial, tax or other professional advisers;
              </li>
              <li>the administrator (where applicable);</li>
              <li>
                introducers, distributors or other intermediaries who market or
                provide services to you;
              </li>
              <li>
                professional advisers including lawyers, bankers, auditors and
                insurers to the extent such information is relevant to their
                performance of their services;
              </li>
              <li>regulators;</li>
              <li>tax authorities;</li>
              <li>prime brokers/depositaries;</li>
              <li>trading counterparties;</li>
              <li>cloud service providers;</li>
              <li>parties undertaking anti-money laundering checks; and</li>
              <li>
                any of our service providers where such information is relevant
                to their performance of such services.
              </li>
            </ul>
            <p className="text-sm font-mulish text-white mb-4">
              We may share your personal data with third parties, for example in
              the context of the possible sale or restructuring of the business.
              We may also need to share your personal data with a regulator or
              to otherwise comply with applicable law or judicial process or if
              we reasonably believe that disclosure is necessary to protect our
              rights and/or to comply with judicial or regulatory proceedings, a
              court order or other legal process.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              We may transfer the personal data we collect about you to
              countries outside of the UK and European Economic Area, where the
              parties listed above are based for the purposes outlined in the
              table above. Those countries may
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              not have the same standard of data protection laws as the UK or
              EEA. Where this is the case, unless an exemption applies, we will
              seek to put in place appropriate safeguards where possible, such
              as approved standard contractual clauses to ensure that your
              personal data is treated in a manner that is consistent with and
              respects the UK laws on data protection. If you require further
              information about this you can request it via
              <a
                className="text-accent font-bold"
                href="mailto:privacy@alamut-im.com"
              >
                privacy@alamut-im.com
              </a>
              .
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              <strong>How long will we retain your information?</strong>
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              We will retain your personal data for as long as necessary to
              fulfil the purposes for which it was collected, including for the
              purposes of satisfying any legal, regulatory, accounting or
              reporting requirements and our legitimate interests in maintaining
              such personal information in our records. This will normally
              include any period during which we are dealing or expect to deal
              with you and what we consider to be a suitable period thereafter
              for our internal record-keeping purposes. In doing this we will
              have regard to the amount, nature, and sensitivity of the personal
              data, the potential risk of harm from unauthorised use or
              disclosure of your personal data, the purposes for which we
              process your personal data and whether we can achieve those
              purposes through other means, and the applicable legal
              requirements. Generally, we will keep information relevant to our
              dealings with you for ten years following the last date of
              activity.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              In some circumstances your personal data may be anonymised so that
              it can no longer be associated with you, in which case it is no
              longer personal data.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              Once we no longer require your personal data for the purposes for
              which it was collected, we will securely destroy your personal
              data in accordance with applicable laws and regulations.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              <strong>Accuracy of information</strong>
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              It is important that the personal data we hold about you is
              accurate and current. Please let us know if your personal data
              which we hold changes during your relationship with us.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              <strong>Your rights in relation to your information</strong>
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              Subject to applicable law, you have rights as an individual which
              you can exercise in relation to the information we hold about you
              under certain circumstances. These rights are to:
            </p>
            <ul className="text-sm font-mulish text-white mb-4 list-disc pl-6">
              <li>
                request <strong>access</strong> to your personal data (commonly
                known as a “data subject access request”) and request certain
                information in relation to its processing;
              </li>
              <li>
                request <strong>rectification</strong> of your personal data;
              </li>
              <li>
                request the <strong>erasure</strong> of your personal data;
              </li>
              <li>
                request the <strong>restriction</strong> of processing of your
                personal data;
              </li>
              <li>
                <strong>object</strong> to the processing of your personal data;
              </li>
              <li>
                request the <strong>transfer</strong> of your personal data to
                another party.
              </li>
            </ul>
            <p className="text-sm font-mulish text-white mb-4">
              If you want to exercise one of these rights please contact us at{" "}
              <a
                className="text-accent font-bold"
                href="mailto:privacy@alamut-im.com"
              >
                privacy@alamut-im.com
              </a>
              .
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              In exercising your rights above, you may be required to redeem
              from your investment with us or any Fund to which we provide
              investment management or investment advisory services.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              You also have the right to make a complaint at any time to a
              supervisory authority for data protection issues.
            </p>
            <p className="text-sm font-mulish text-white mb-4 underline">
              Fees
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              You will not usually have to pay a fee to access your personal
              data (or to exercise any of the other rights). However, we may
              charge a reasonable fee if your request for access is manifestly
              unfounded or excessive. Alternatively, we may refuse to comply
              with the request in such circumstances.
            </p>
            <p className="text-sm font-mulish text-white mb-4 underline">
              What we may need from you
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              We may need to request specific information from you to help us
              confirm your identity and ensure your right to access the
              information (or to exercise any of your other rights). This is
              another appropriate security measure to ensure that personal data
              is not disclosed to any person who has no right to receive it.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              <strong>Right to withdraw consent</strong>
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              In the limited circumstances where you may have provided your
              consent to the collection, processing and transfer of your
              personal data for a specific purpose, you have the right to
              withdraw your consent for that specific processing at any time. To
              withdraw your consent, please contact{" "}
              <a
                className="text-accent font-bold"
                href="mailto:privacy@alamut-im.com"
              >
                privacy@alamut-im.com
              </a>
              . Once we have received notification that you have withdrawn your
              consent, we will no longer process your information for the
              purpose(s) to which you originally consented unless we now have an
              alternative legal basis for doing so.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              <strong>Changes to this privacy notice</strong>
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              We reserve the right to update this Privacy Notice at any time,
              and we will make an updated copy of such Privacy Notice available
              to you and notify you when we make any substantial updates. We may
              also notify you in other ways from time to time about the
              processing of your personal data.
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              <strong>Further information</strong>
            </p>
            <p className="text-sm font-mulish text-white mb-4">
              This Privacy Notice was written with brevity and clarity in mind
              and is not an exhaustive account of all aspects of our collection
              and use of personal data. If you require any further information,
              please do not hesitate to contact{" "}
              <a
                className="text-accent font-bold"
                href="mailto:privacy@alamut-im.com"
              >
                privacy@alamut-im.com
              </a>
              .
            </p>
          </>
        );
    }
  };

  return (
    <section className="h-full relative">
      <div className="h-screen w-screen fixed z-0 bg-[#0A2D32]">
        <Image
          src={"/images/new-mountain-landscape.webp"}
          fill
          alt="mountains background"
          objectFit="cover"
          className="-z-10 opacity-50"
        />
      </div>
      <div className="h-full w-full lg:p-20 p-10 lg:pb-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
          <div className="menu lg:col-span-1 col-span-4 lg:fixed block">
            <ul>
              <Link href="/">
                <Image
                  src="/icons/logo.svg"
                  alt="Almasar Minerals Logo"
                  width={256}
                  height={64}
                  className="w-32 lg:w-64 mb-10"
                />
              </Link>
              {links.map((item: string, key: number) => {
                return (
                  <li
                    key={key}
                    onClick={() => {
                      setContent(item);
                    }}
                    className="font-mulish text-white text-sm font-semibold mb-4 cursor-pointer"
                    style={item === content ? { color: "#fff" } : {}}
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-span-3 lg:col-start-2 overflow-x-hidden lg:pl-10 min-h-[60vh]">
            {returnContent()}
          </div>
        </div>
      </div>
    </section>
  );
}
