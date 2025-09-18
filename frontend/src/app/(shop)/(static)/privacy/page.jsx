import PageHeader from "@/components/global/PageHeader"
import PageParagraph from "@/components/global/PageParagraph"
import Breadcrumb from "@/components/global/Breadcrumb"
import PageSubHead from "@/components/global/PageSubHead"

export const metadata = {
    title: 'Privacy Policy | MatchMyTees',
    description: "Understand how MatchmyTees handles your personal information with our Privacy Policy. Learn about data collection, usage, and your rights. Contact us for inquiries.",
}

export default function PrivacyPage() {
    return (
        <div>
            <Breadcrumb
                title={"Home > Privacy Policy"}
            />

            <div className="my-container flex flex-col gap-5 my-6 max-md:items-center md:my-10 xl:my-14 lg:p-[60px]">
                <PageHeader title={'Privacy Policy'} />
                <PageParagraph text={`This Privacy Policy outlines how MatchmyTees (<b>"we"</b>, <b>"us"</b>, <b>"our"</b>, or the <b>"Site"</b>) collects, uses, and shares your personal information when you access or use our services or make a purchase from matchmytees.com (the <b>"Site"</b>) or otherwise interact with us (collectively, the <b>"Services"</b>). The terms "you" and "your" in this Privacy Policy relate to you as the person who uses the Services, be it as a client, website visitor, or any individual whose data we have gathered by this Privacy Policy.</br></br>Please read this Privacy Policy carefully. If you do not agree with this Privacy Policy, please do not use or access any of the Services. Please read this Privacy Policy carefully. By using or accessing any of the Services, you consent to the collection, use, and sharing of your information as defined in this Privacy Policy.`} />
                <PageSubHead title={'CHANGES TO THIS PRIVACY POLICY'} customClass={'mt-6'} />
                <PageParagraph text={`This Privacy Policy may be updated from time to time to reflect modifications to our procedures or for additional operational, legal, or regulatory purposes. Any modifications will have a new "Last updated" date on the website, and we'll take any further actions mandated by relevant laws.`} />
                <PageSubHead title={'COLLECTION AND USE OF YOUR PERSONAL INFORMATION'} customClass={'mt-6'} />
                <PageParagraph text={`To deliver the Services, we gather personal information about you from diverse origins, as elaborated below. The nature of the information collected and its utilization varies based on your interactions with us.</br></br>We may use your information for the purposes listed below as well as for the particular purposes mentioned below, such as communicating with you, offering the Services, adhering to legal requirements, enforcing the terms of service, and defending our own and third parties' rights.`} />
                <PageSubHead title={'INFORMATION WE COLLECT'} customClass={'mt-6'} />
                <PageParagraph text={`The kinds of personal data we gather are contingent upon your usage of our website and services. Information that may be used to identify, relate to, characterize, or be connected to you is referred to as "personal information". The categories and particular kinds of data we gather are listed below.`} />

                <PageSubHead title={'INFORMATION PROVIDED DIRECTLY BY YOU'} customClass={'mt-6'} />
                <PageParagraph text={`Information that you input directly into our Services may include:`} />
                <ul className='!list-disc !list-inside text-base font-roboto text-sub-work-card max-sm:text-center md:text-sm xl:text-xl xl:font-medium'>
                    <ul className='!list-disc !list-inside ml-5'>
                        <li>Contact information, including your name, email address, phone number, and address.</li>
                        <li>Information about your order, such as your phone number, email address, payment confirmation, billing and delivery address, and name.</li>
                        <li>Account details, such as password, security questions, and username.</li>
                        <li>This includes information about items you viewed, added to your shopping cart, or added to your wish list.</li>
                        <li>Customer support information including details you provide when communicating with us.</li>
                    </ul>
                </ul>
                <PageParagraph text={`You can asked to directly give some information in order to use some features of the Services. You have the option to withhold this information, but doing so could make it impossible for you to use some functions.`} />

                <PageSubHead title={'INFORMATION COLLECTED THROUGH COOKIES'} customClass={'mt-6'} />
                <PageParagraph text={'Using cookies, pixels, and related technologies, we automatically gather some information about how you interact with the Services ("Usage Data"). Usage Data may comprise facts about your device, browser, network connection, IP address, device information, and other interaction information, as well as information about how you access and use our site.'} />

                <PageSubHead title={'INFORMATION FROM THIRD PARTIES'} customClass={'mt-6'} />
                <PageParagraph text={'Additionally, third parties, such as suppliers and service providers that gather data on our behalf, may give us information about you. Examples of these parties may be:</br></br>Payment processors: These companies gather payment information (bank account, credit or debit card number, billing address, etc.) to process your orders and complete transactions.</br></br>Using online tracking technologies like pixels, web beacons, software development kits, third-party libraries, and cookies, we or third parties we work with may automatically collect certain information when you visit our site, open or click on emails, or interact with our services or advertisements.</br></br>We will handle any information we receive from outside sources in compliance with this privacy statement. We disclaim all liability for the veracity of any information supplied by third parties or for any of their activities or policies.'} />

                <PageSubHead title={'USE OF YOUR PERSONAL INFORMATION'} customClass={'mt-6'} />
                <ul className='!list-disc !list-inside text-base font-roboto text-sub-work-card max-sm:text-center md:text-sm xl:text-xl xl:font-normal space-y-4'>
                    <li><b>Providing Services:</b> To fulfill our obligations under our contract with you, we use your personal information to provide you with the Services. This includes processing payments, completing orders, notifying you about purchases, returns, exchanges, and other transactions, creating, maintaining, and managing your account, setting up shipping, assisting with returns and exchanges, and allowing you to leave reviews.</li>
                    <li><b>Marketing and Advertising:</b> We utilize your personal information for marketing and promotional purposes, which include showing you product or service adverts and sending marketing, advertising, and promotional messages via email, text message, or postal mail. This might entail utilizing your data to better customize our services and the advertisements we display on our site and other websites.</li>
                    <li><b>Security and Fraud Prevention:</b> To identify, look into, or take appropriate action about potential fraudulent, unlawful, or harmful behavior, we utilize your personal information. You are in charge of protecting your account credentials if you decide to use the Services and create an account. It is strongly advised that you keep your login, password, and any access information private. Should you suspect that your account has been hacked, please get in touch with us right now.</li>
                    <li><b>Communications:</b> Your personal information is used by us to enhance our services and give you customer assistance. To stay in business with you, respond to your needs, and give you efficient services, is in our legitimate interests.</li>

                </ul>

                <PageSubHead title={'COOKIES'} customClass={'mt-6'} />
                <PageParagraph text={`We utilize cookies on our site, just like many other websites. We employ cookies to perform analytics, better understand user behavior on the Services, and power and enhance our Site and Services (including remembering your activities and preferences) (in our legitimate interests to manage, operate, and optimize the Services). To better customize the services, goods, and advertisements on our site and other websites, we could also allow service providers and third parties to utilize Cookies on our site.</br></br>By default, the majority of browsers allow cookies; however, you can use your browser's settings to reject or erase cookies. Please remember that disabling or blocking Cookies may hurt how you use the Services and may result in the erroneous or unavailable operation of some features and general functionality. Furthermore, restricting Cookies does not stop us from sharing information with outside parties like our advertising partners.`} />
                <PageSubHead title={'DISCLOSURE OF PERSONAL INFORMATION'} customClass={'mt-6'} />
                <PageParagraph text={`Under certain conditions and following this Privacy Policy, we may divulge your personal information to third parties for lawful purposes. These situations might involve:`} />
                <ul className='!list-disc !list-inside text-base font-roboto text-sub-work-card max-sm:text-center md:text-sm xl:text-xl xl:font-normal'>
                    <ul className='!list-disc !list-inside ml-5'>
                        <li>Through vendors or other third parties who conduct services on our behalf (e.g., IT management, payment processing, data analytics, customer support, cloud storage, fulfillment, and shipping).</li>
                        <li>When you ask us to share specific information with third parties, for example, to send you a product or allow us to utilize social media widgets or login integrations, or when you otherwise permit us to do so.</li>
                        <li>It is in our legitimate interest to operate a profitable business, whether alone or in conjunction with our affiliates, within our corporate group.</li>
                        <li>In connection with a business transaction, such as a merger or bankruptcy; to uphold any applicable terms of service; to comply with any legal requirements (such as answering subpoenas, search warrants, and similar requests); and to safeguard or defend the Services, our rights, and the rights of our users or third parties.</li>
                    </ul>
                </ul>

                <PageParagraph text={`For the objectives outlined above in "How We Collect and Use Your Personal Information" and "How We Disclose Personal Information," we have revealed the following kinds of personal information and sensitive personal information (denoted by *) concerning users within the last 12 months:`} />
                <div className="flex  place-content-center ">
                    <div className="max-w-[850px] ">
                        <table className="table-fixed border-collapse border border-slate-400 py-2 px-2 w-full">
                            <thead className='w-full'>
                                <tr>
                                    <th className="border border-slate-300 py-2 px-2">Category</th>
                                    <th className="border border-slate-300 py-2 px-2">Recipients</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-slate-300 py-2 px-2">Identifiers like some order and account information and basic contact details</td>
                                    <td className="border border-slate-300 py-2 px-2">Vendors and other entities that carry out tasks on our behalf (including ISPs, payment gateways, fulfillment partners, customer service partners, and data analytics providers)</td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-300 py-2 px-2">Information related to business, including order, shopping, and customer service details</td>
                                    <td className="border border-slate-300 py-2 px-2">Business and marketing partners</td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-300 py-2 px-2">The usage of the Internet or other comparable network activity, such as usage data</td>
                                    <td className="border border-slate-300 py-2 px-2">Affiliates</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <PageParagraph text={`Sensitive personal information is not used or disclosed by us to conclude you.`} />

                <PageSubHead title={'USER-GENERATED CONTENT'} customClass={'mt-6'} />
                <PageParagraph text={`You might be able to upload user-generated material, such as product reviews, using the Services. Should you decide to post user-generated material in any open section of the Services, everyone will be able to view and access it.</br></br>We don't guarantee that third parties that obtain information about you will protect it or respect your privacy since we have no control over who will have access to it. We disclaim any liability for the confidentiality or security of any information you give to the public, or for the accuracy, use, or abuse of any information you obtain from third parties or transmit to them.`} />
                <PageSubHead title={'THIRD-PARTY LINKS'} customClass={'mt-6'} />
                <PageParagraph text={`We may links to other websites or online platforms run by third parties may be found on our site. You should read the terms and conditions as well as the privacy and security policies of any websites you visit that are not under our control or affiliation. The security or privacy of these websites, as well as the correctness, comprehensiveness, or dependability of the information contained there, are not guaranteed by us, and we bear no duty for them. There is no restriction on how we or a third party may use the information you submit in public or semi-public settings, including on social networking sites operated by third parties. It may also be accessible to other users of the Services and/or users of such third-party platforms. By itself, our provision of these links does not indicate any.`} />
                <PageSubHead title={'CHILDREN’S DATA'} customClass={'mt-6'} />
                <PageParagraph text={`Children are not supposed to use the Services, and we do not intentionally gather any personal data about them. You can request that the personal information of a child who has supplied it to us be erased by contacting us using the information below if you are the child's parent or guardian.</br></br>As of this privacy policy's effective date, we are not aware that we "share" or "sell" (as those words are defined by relevant legislation) personal information belonging to people who are less than 16 years old.`} />
                <PageSubHead title={'SECURITY AND RETENTION'} customClass={'mt-6'} />
                <PageParagraph text={`Please be advised that we cannot guarantee "perfect security," since no security mechanism is flawless or impregnable. Furthermore, while in transit, any information you provide to us could not be secure. It is advised that you do not send us sensitive or private information over insecure means.</br></br>The length of time we keep your personal information varies depending on a number of circumstances, including whether we require it to manage your account, deliver the Services, satisfy legal requirements, settle disputes, or uphold other relevant agreements and guidelines.`} />

                <PageSubHead title={'YOUR RIGHTS AND CHOICES'} customClass={'mt-6'} />
                <PageParagraph text={`You may be entitled to any or all of the following rights about your personal information, depending on where you reside. These rights, however, are not absolute, and may only apply in specific situations, and we may, as allowed by law, reject your request in some situations.`} />
                <ul className='!list-disc !list-inside text-base font-roboto text-sub-work-card max-sm:text-center md:text-sm xl:text-xl xl:font-normal'>
                    <ul className='!list-disc !list-inside ml-5'>
                        <li><b>Right to Access:</b> You might be able to get access to the personal data we have on file about you, together with information on how we use and disclose that data.</li>
                        <li><b>Right to Delete:</b> You might be able to ask us to remove any personal data we may have on file about you.</li>
                        <li><b>Right to Correct:</b> You might be able to ask us to update any erroneous personal data we may have on file about you.</li>
                        <li><b>Right to Portability:</b> Under some conditions and with certain exclusions, you may be able to request a copy of the personal data we maintain on you and that it be transferred to a third party.</li>
                        <li><b>Restriction of Processing:</b> You may be able to request that we cease processing personal data or limit how we use it.</li>
                        <li><b>Withdrawal of Consent:</b> You may be able to revoke your permission in situations when we use it to handle your personal data.</li>
                        <li><b>Appeal: </b>If we reject your request, you might be able to appeal our choice. You can accomplish this by immediately responding to our refusal.</li>
                        <li><b>Managing Communication Preferences:          </b> You have the option to stop receiving promotional emails from us at any time by using the unsubscribe link found in any email we send you. Even if you want to unsubscribe, we could still send you non-promotional communications concerning your account or past purchases.</li>
                    </ul>
                </ul>
                <PageParagraph text={`As stated on our website, you can use any of these rights by getting in touch with us using the information below.</br></br>If you exercise any of these rights, you won't face any discrimination from us. Before giving a thorough answer to the request, we might need to get some information from you to confirm your identity, including your email address or account details. You may select an authorized agent to act on your behalf and make requests to exercise your rights in compliance with relevant laws. Before approving an agent's request, we could ask you to confirm your identification with us directly and ask the agent to show us that you have permitted them to act on your behalf. In line with any legal requirements, we will reply to your request as soon as possible.`} />

                <PageSubHead title={'COMPLAINTS'} customClass={'mt-6'} />
                <PageParagraph text={`Please contact us using the information below if you have any problems regarding how we handle your personal data. If you're not happy with how we handled your complaint, you may be able to challenge our ruling by getting in touch with us using the information provided below, or you may be able to file a complaint with your local data protection agency. This will depend on where you reside.`} />
                <PageSubHead title={'INTERNATIONAL USERS'} customClass={'mt-6'} />
                <PageParagraph text={`We may transmit, store, and process your personal information outside of the country in which you now reside, including the United States. Please be aware of this. Employees, partners, and outside service providers in these nations also process your personal data.</br></br>Unless the data transfer is to a nation that has been found to provide an adequate level of protection, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses or any equivalent contracts issued by the relevant competent authority of the UK, if relevant, if we transfer your personal information outside of Europe.`} />
                <PageSubHead title={'CONTACT'} customClass={'mt-6'} />
                <PageParagraph text={`For questions about our privacy practices or this Privacy Policy, or to exercise your rights, email us at support@matchmytees.com or contact us at:</br></br>Pippa Technologies Inc</br><a href="mailto:support@matchmytees.com" class="text-blue-600 font-bold">support@matchmytees.com</a></br>458 Main St, Kentville, NS, B4N 3X3, Canada.`} />
            </div>
        </div>
    )
}