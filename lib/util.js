/**
 * Returns the range object of the current selection on screen.
 * @returns {Range}
 */
function selRange(){
    return window.getSelection().getRangeAt(0);
}

/**
 * It returns the most top-level node to contain 
 * any other selected nodes (The common parent of everything selected).
 * It returns null if no selection is present.
 * @returns {HTMLElement | null}
 */
function selContainer(){
    const selection = window.getSelection();

    if(selection && !selection.isCollapsed){
        // Get the first range of the selection
        const range = selection.getRangeAt(0);
        // Determine the common ancestor node of the anchor and focus nodes using the Range object
        const commonAncestor = range.commonAncestorContainer;
    
        return commonAncestor;
    }
    else return null
}

/**
 * Checks if an element with specified tag name and optionally attributes exists
 * inside the current selection in the document.
 * Returns true or false
 * @returns {boolean}
 * @param {string} nodeName 
 * @param {object} attributes the attributes is an object like so: 
 * @example
 *  isInSel("span", {class: 'myClassName', id: 'myId'});
 *  //
 */
function isInSel(nodeName, attributes) {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed()) {
        const range = selection.getRangeAt(0); // Get the selected Range object
        
        return findElement(range.commonAncestorContainer);
    }

    return false; // No selection or collapsed selection
}

// Helper Function:: Recursive function [for isInSel() fn] to search within the selection
function findElement(container) {
    const children = container.childNodes;
    for (let child of children) {

        if (child.nodeType === Node.ELEMENT_NODE) {
            if (child.nodeName.toLowerCase() === nodeName.toLowerCase() &&
                isMatchingAttributes(child, attributes)) {
                return true; 
            }
            // it will not evaluate this if the above is true cuz it returns
            if (findElement(child)) { // <--- Recursion here
                return true; 
            }
        }
    }
    return false; // Not found
}

// Helper Function:: [for findElement() fn] to check attributes
function isMatchingAttributes(element, attributes) {
    if (!attributes) return true; // No attributes to check

    for (const attrName in attributes) {
        if (!element.hasAttribute(attrName) || 
            element.getAttribute(attrName) !== attributes[attrName]) {
            return false;
        }
    }
    return true;
}

export {
    isInSel,
    selContainer,
    selRange
};