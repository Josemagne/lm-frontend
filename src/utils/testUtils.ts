export function findByTestAttr(component: any, attr: any) {
    const wrapper = component.find(`[data-test-id=${attr}]`)
    return wrapper;
}
