import { Any } from '@angular-ru/cdk/typings';

import { isTrue } from './is-true';

export function checkSomeValueIsTrue(...values: Any[]): boolean {
    return values.some((element: Any): element is boolean => isTrue(element));
}
