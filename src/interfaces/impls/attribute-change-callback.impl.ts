export interface AttributeChangeCallbackImpl {
    attributeChangedCallback(name: string, convertedOldValue: any, convertedNewValue: any, camelCaseName: string): void;
}