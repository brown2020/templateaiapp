export interface FAQItem {
    question: string;
    answer: string;
    displayInLanding: boolean;
}

export interface FAQSection {
    title: string;
    items: FAQItem[];
}