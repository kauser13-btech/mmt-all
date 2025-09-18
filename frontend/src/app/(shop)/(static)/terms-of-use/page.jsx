import PageHeader from "@/components/global/PageHeader"
import PageParagraph from "@/components/global/PageParagraph"
import Breadcrumb from "@/components/global/Breadcrumb"
import PageSubHead from "@/components/global/PageSubHead"

export const metadata = {
    title: 'Term of Use | MatchMyTees',
    description: "Learn about MatchMyTees' Terms of Service governing website use and transactions. Understand your rights and responsibilities, and contact us for assistance or inquiries. Review now to ensure compliance.",
}

export default function TermsOfUsePage() {
    return (
        <main>
            <Breadcrumb
                title={"Home > Terms of Use"}
            />

            <div className='my-container flex flex-col gap-5 my-6 max-md:items-center md:my-10 xl:my-14 lg:p-[60px]'>
                <PageHeader title={'terms of use'} />
                <PageSubHead title={'OVERVIEW'} customClass={'mb-4'} />
                <PageParagraph text={`This website is managed by MatchMyTees. Within this “site,” the terms “we,” “us,” and “our '' refer to MatchMyTees. By offering this website, MatchMyTees provides all the information, tools, and services available here to you, the user, on the condition that you accept all terms, conditions, policies, and notices outlined here.`} />
                <PageParagraph text={`By accessing our site and/or buying something from us, you are engaging with our “Service” and agree to comply with the following terms and conditions (“Terms of Service,” “Terms”), as well as any additional terms, conditions, and policies mentioned here or accessible via hyperlink. These Terms of Service are applicable to all users of the site, including but not limited to browsers, vendors, customers, merchants, and content contributors.`} />
                <PageParagraph text={`Please review these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to carry on to these Terms of Service. If you do not agree with all the terms and conditions of this agreement, you are not permitted to access the website or use any Services. If these Terms of Service are considered an offer, acceptance is explicitly limited to these Terms of Service.`} />
                <PageParagraph text={`All the new features or tools introduced to the current store will be under the Terms of Service. The most recent version of the Terms of Service is always available on this page for your review. We reserve the right to revise, amend, or replace any portion of these Terms of Service by posting updates and/or modifications on our website. You have to periodically review this page for any changes. Continued use of or access to the website after changes are posted signifies your acceptance of those changes.`} />

                <PageSubHead title={'SECTION 1 - ONLINE STORE TERMS'} customClass={'mt-6'} />
                <PageParagraph text={`When you agree to these Terms of Service, you confirm that you are either of the age of majority in your province or territory of residence, or that you are of the age of majority in your province or territory of residence and have given us your consent to allow any of your minor dependents to use this site.`} />
                <PageParagraph text={`You are prohibited from using our products for any illegal or unauthorized purposes, and you must not violate any laws in your jurisdiction while using the Service (including copyright laws). You must not transmit any worms, viruses, or any destructive code. Any breach or violation of these Terms will lead to an immediate termination of your Services.`} />

                <PageSubHead title={'SECTION 2 - GENERAL CONDITIONS'} customClass={'mt-6'} />
                <PageParagraph text={`MatchMyTees reserves the right to refuse service to anyone for any reason at any time. You acknowledge that your content (excluding credit card information) may be transferred unencrypted and may involve (a) transmissions over various networks and (b) modifications to meet the technical requirements of connecting networks or devices. When the information is transferred over the network, it is always encrypted.`} />
                <PageParagraph text={`Without our express written permission, you agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service or any part of the website through which the Service is provided.`} />
                <PageParagraph text={`There are no limitations or other effects to these Terms based on the headings in this agreement.`} />

                <PageSubHead title={'SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION'} customClass={'mt-6'} />
                <PageParagraph text={`If any of the information provided on this website is inaccurate, out-of-date, or incomplete, we disclaim all liability. This website's content is offered for general information purposes only, and it shouldn't be relied upon or utilized as the only basis for judgments without first contacting primary sources of information that are more reliable, complete, accurate, or current. You bear all liability for relying on any content on this website.`} />
                <PageParagraph text={`There may be historical material on this website. Information from the past is unavoidably out of date and is given solely for your reference. We do not have to update any material on our site, but we do retain the right to change any part of its contents at any moment. You acknowledge that it is your duty to keep an eye on any modifications made to our website.`} />

                <PageSubHead title={'SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES'} customClass={'mt-6'} />
                <PageParagraph text={`We reserve the right to adjust product prices and specifications without prior notice.`} />
                <PageParagraph text={`We retain the right to alter or cease the Service (or any part or content thereof) at any time without prior notice.`} />
                <PageParagraph text={`We are not responsible to you or any third party for any adjustments, price alterations, suspensions, or terminations of the Service.`} />

                <PageSubHead title={'SECTION 5 - PRODUCTS OR SERVICES (if applicable)'} customClass={'mt-6'} />
                <PageParagraph text={`There may be some items or services that are only accessible online via the website. These items or services can only be available in restricted quantities, and returns or exchanges are permitted only in accordance with our refund policy at  https://matchmytees.com/return-refund/`} />
                <PageParagraph text={`We've done everything we can to ensure that the colors and pictures of our items truly reflect the ones that are seen in the store. We cannot guarantee that any color seen on your computer monitor will be accurate.`} />
                <PageParagraph text={`Although we are not required to, we reserve the right to restrict the sale of our items or services to any individual, group of people, or jurisdiction. We reserve the right to use this authority if needed. We maintain the right to restrict the amount of any items or services we provide. Product prices and descriptions are all subject to change at any moment, without prior warning, and at our sole discretion. Anytime, we have the right to stop selling any goods. Any offer made on this website for any good or service is null and void where prohibited.`} />
                <PageParagraph text={`We do not guarantee that any faults in the Service will be fixed or that the quality of any goods, services, information, or other materials you buy or get will live up to your expectations.`} />


                <PageSubHead title={'SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION'} customClass={'mt-6'} />
                <PageParagraph text={`Any order you place with us may be rejected by us at our discretion. We have the right to restrict or cancel the number of items that can be bought by an individual, a household, or an order. Orders made using the same credit card, customer account, or billing and/or delivery address may be subject to these limitations. We may try to get in touch with you via the email and/or billing address/phone number you supplied at the time of the order if we modify or cancel it. Orders that, in our sole discretion, seem to have been placed by dealers, resellers, or distributors may be subject to limitations or prohibitions.`} />
                <PageParagraph text={`For every purchase you make at our shop, you pledge to give correct, full, and up-to-date transaction and account information. In order for us to finish your transactions and get in touch with you as needed, you commit to updating your account and other details as soon as possible. This information includes your email address, credit card numbers, and expiry dates.`} />
                <PageParagraph text={`Please see our Refund Policy for further information: https://matchmytees.com/return-refund/`} />


                <PageSubHead title={'SECTION 7 - OPTIONAL TOOLS'} customClass={'mt-6'} />
                <PageParagraph text={`We could give you access to third-party technologies that we don't oversee, manage, or have any say over.`} />
                <PageParagraph text={`You understand and accept that we have access to these tools "as is" and "as available," free from any endorsement and free from any form of warranty, guarantee, or condition of any kind. If you choose to utilize optional third-party tools, we won't be held responsible in any way.`} />
                <PageParagraph text={`You use the optional tools available on the site at your own risk and discretion. You should read and agree to the conditions set out by the applicable third-party provider(s) before using any of the tools.`} />
                <PageParagraph text={`Additionally, we could provide additional services and/or features (such as the introduction of fresh tools and resources) via the website in the future. These Terms of Service will also apply to any additional features and/or Services.`} />


                <PageSubHead title={'SECTION 8 - THIRD-PARTY LINKS'} customClass={'mt-6'} />
                <PageParagraph text={`Some content, products, and Services accessible through our Service may contain materials provided by third parties.`} />
                <PageParagraph text={`Links to third-party websites on this site may lead you to websites not affiliated with us. We are not ​responsible for reviewing or assessing the content or accuracy, and we do not guarantee or assume any liability for any third-party materials or websites, or any other materials, products, or Services provided by third parties.`} />
                <PageParagraph text={`When you buy or utilize products, services, resources, or material, or engage in any other transactions through any third-party website, you assume all risk and liability. Before you enter into any transactions, please carefully check and ensure that you understand the third party's rules and procedures. Any queries, grievances, or claims pertaining to goods from third parties have to be addressed to those third parties.`} />

                <PageSubHead title={'SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS'} customClass={'mt-6'} />
                <PageParagraph text={`If you send us specific submissions (like contest entries) at our request or send us creative ideas, suggestions, proposals, plans, or other materials—whether via email, postal mail, or another method—you consent to our using the comments you send us for any purpose, including editing, copying, publishing, distributing, translating, and other uses in any media, at any time and without restriction. We are under no duty, and never will be, to (1) keep any comments confidential; (2) compensate for any remarks; or (3) reply to any comments.`} />
                <PageParagraph text={`In our sole discretion, we reserve the right to monitor, edit, or delete any content that we deem to be illegal, offensive, threatening, libelous, defamatory, pornographic, obscene, or otherwise objectionable, or that violates the intellectual property rights of third parties or these Terms of Service.`} />
                <PageParagraph text={`You guarantee that any rights of third parties, such as copyright, trademarks, privacy, and other property or personal rights, will not be infringed upon by your remarks. You also agree that nothing in your comments will be defamatory, illegal, abusive, or pornographic, nor will it include any malware or computer viruses that could interfere with the proper operation of the Service or any linked website. It is prohibited for you to claim to be someone you are not, use a fictitious email address, or mislead us or other parties about the origin of any remarks. The veracity and correctness of any remarks you make are entirely your responsibility. Regarding any remarks that you or any other third party may submit, we neither guarantee nor accept responsibility for them.`} />

                <PageSubHead title={'SECTION 10 - PERSONAL INFORMATION'} customClass={'mt-6'} />
                <PageParagraph text={`Our Privacy Policy applies when you submit personal information through the store. Please visit https://matchmytees.com/privacy/ to read our privacy policy.`} />

                <PageSubHead title={'SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS'} customClass={'mt-6'} />
                <PageParagraph text={`At times, there may be information on our site or within the Service that includes typographical errors, inaccuracies, or omissions pertaining to product descriptions, pricing, promotions, offers, shipping charges, transit times, and availability. We retain the right to rectify any errors, inaccuracies, or omissions, and to amend or update information or annual orders if any details in the Service or on any associated website are found to be inaccurate at any time, without prior notice (even after you have placed your order).`} />
                <PageParagraph text={`With the exception of information mandated by law, we assume no responsibility to update, modify, or clarify any information included in the Service or on any linked website, including without limitation, price information. It should not be assumed that all of the information in the Service or on any linked website has been updated or changed just because there isn't a clear update or refresh date attached.`} />

                <PageSubHead title={'SECTION 12 - PROHIBITED USES'} customClass={'mt-6'} />
                <PageParagraph text={`You are not allowed to use the site or any of its material, in addition to the other limitations stated in the Terms of Service. (a) the use of any unlawful purpose; (b) the encouragement of others to carry out or take part in any unlawful acts; (c) the breach of any international, national, provincial, or state laws, rules, regulations, or local ordinances; (d) the infringement or violation of our or others' intellectual property rights; (e) the harassment, abuse, insulting, harming, defaming, slandering, disparaging, intimidating, or discriminating on the basis of gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) the submission of false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to gather or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. If you violate any of the prohibited uses, we retain the right to stop you from using the Service or any connected website.`} />

                <PageSubHead title={'SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY'} customClass={'mt-6'} />
                <PageParagraph text={`The uninterrupted, timely, secure, and error-free nature of your use of our Service is not guaranteed by us. `} />
                <PageParagraph text={`The results you get from using the Service aren't guaranteed to be accurate or reliable. You accept that we may temporarily discontinue the Service or terminate it at any time without prior notice to you.`} />
                <PageParagraph text={`By using the Service, or being unable to use it, you agree that you do so at your own risk. You can get products and services through the Service "as is" and "as available", with no representations, warranties, or conditions of any kind, express or implied. Except where we expressly state otherwise, all implied warranties and conditions for merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement apply.`} />
                <PageParagraph text={`MatchMyTees, along with our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers, or licensors, shall not be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind. This includes, without limitation, lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability, or otherwise, arising from your use of the Service or any products procured through the Service. This also applies to any other claims related to your use of the Service or any product, including errors or omissions in any content, or any loss or damage incurred as a result of the use of the Service or any content (or product) posted, transmitted, or otherwise made available via the Service, even if advised of their possibility. In states or jurisdictions that do not allow the exclusion or limitation of liability for consequential or incidental damages, our liability shall be limited to the maximum extent permitted by law.`} />

                <PageSubHead title={'SECTION 14 - INDEMNIFICATION'} customClass={'mt-6'} />
                <PageParagraph text={`During the course of your relationship with MatchMyTees, you'll have to indemnify, defend, and protect us, our parent company, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns, and employees from any claims or demands, including legal fees, brought by third parties if you violate these Terms of Service, any referenced documents, or violate any law.`} />

                <PageSubHead title={'SECTION 15 - SEVERABILITY'} customClass={'mt-6'} />
                <PageParagraph text={`If any provision of these Terms of Service is found to be unlawful, void, or unenforceable, that provision will be enforced to the fullest extent permitted by applicable law. The unenforceable portion will be considered separate from these Terms of Service, and this determination will not affect the validity or applicability of any remaining provisions.`} />

                <PageSubHead title={'SECTION 16 - TERMINATION'} customClass={'mt-6'} />
                <PageParagraph text={`The obligations and liabilities of the parties that were incurred before the termination date will remain in effect even after the Agreement is terminated.`} />
                <PageParagraph text={`These Terms of Service are in effect unless terminated by either you or us. You can terminate our Terms of Service at any time if you no longer wish to use our services or if you stop using our site.`} />
                <PageParagraph text={`If, in our sole judgment, you fail to comply with any term or provision of these Terms of Service, or if we suspect you have failed to comply, we may terminate this Agreement at any time without notice. In this case, you will be responsible for all amounts due up to and including the date of termination. Additionally, we may deny you access to our Services, or any part of our Services accordingly.`} />

                <PageSubHead title={'SECTION 17 - ENTIRE AGREEMENT'} customClass={'mt-6'} />
                <PageParagraph text={`Failure to exercise or enforce any right or provision of these Terms of Service does not constitute a waiver of such right or provision.`} />
                <PageParagraph text={`These Terms of Service, along with any policies or operating rules posted on this site or in connection with the Service, constitute the entire agreement between you and us regarding your use of the Service. This agreement supersedes any prior or contemporaneous agreements, communications, and proposals, whether oral or written, between you and us, including any previous versions of the Terms of Service.`} />
                <PageParagraph text={`Any ambiguity in the interpretation of these Terms of Service shall not be construed against the party that drafted them.`} />

                <PageSubHead title={'SECTION 18 - GOVERNING LAW'} customClass={'mt-6'} />
                <PageParagraph text={`These Terms of Service and any separate agreements under which we provide you with Services shall be governed by and construed in accordance with the laws of Canada.`} />

                <PageSubHead title={'SECTION 19 - CHANGES TO TERMS OF SERVICE'} customClass={'mt-6'} />
                <PageParagraph text={`You can always find the most current version of the Terms of Service on this page.`} />
                <PageParagraph text={`We may update, modify, or replace any part of these Terms of Service at any time by posting updates and changes on our website. It is your responsibility to regularly check our website for any changes. Please remember to regularly check our website for any updates. By continuing to use our website or the Service after any changes to these Terms of Service, you are indicating your acceptance of those changes.`} />

                <PageSubHead title={'SECTION 20 - CONTACT INFORMATION'} customClass={'mt-6'} />
                <PageParagraph text={`If you have any concerns or questions about the "Terms of Service", please contact us at support@matchmytees.com. </br> </br> Pippa Technologies Inc DBA MatchMyTees. </br> <a href="mailto:support@matchmytees.com" class="text-blue-600 font-bold">support@matchmytees.com</a> </br> 458 Main St, Kentville, NS, B4N 3X3, Canada.`} />
            </div>
        </main>
    )
}