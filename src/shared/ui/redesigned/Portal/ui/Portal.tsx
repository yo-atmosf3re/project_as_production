import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalPropsI {
    children: ReactNode;
    element?: HTMLElement;
}

// ? С помощью портала можно сделать вот так:
// ? <body>
// ? -- <root></root>
// ? -- <div class='modal'>Modal example</div>
// ?</body>
/**
 * Нативный реактовский портал - предоставляет возможность визуализировать дочерний элемент в узел DOM, который существует вне иерархии родительского компонента;
 * @param children
 * @param element
 */
export const Portal: React.FC<PortalPropsI> = ({
    children,
    element = document.body,
}) => createPortal(children, element);
