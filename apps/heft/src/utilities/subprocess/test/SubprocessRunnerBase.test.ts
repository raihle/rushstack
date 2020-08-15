// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { SubprocessRunnerBase } from '../SubprocessRunnerBase';

describe('SubprocessRunnerBase', () => {
  it(`${SubprocessRunnerBase.serializeForIpcMessage.name} correctly serializes objects`, () => {
    expect(SubprocessRunnerBase.serializeForIpcMessage(1)).toMatchSnapshot();
    expect(SubprocessRunnerBase.serializeForIpcMessage(false)).toMatchSnapshot();
    expect(SubprocessRunnerBase.serializeForIpcMessage('abc')).toMatchSnapshot();
    // eslint-disable-next-line @rushstack/no-null
    expect(SubprocessRunnerBase.serializeForIpcMessage(null)).toMatchSnapshot();
    expect(SubprocessRunnerBase.serializeForIpcMessage(undefined)).toMatchSnapshot();
    const error: Error = new Error();
    error.stack = 'ERROR STACK';
    expect(SubprocessRunnerBase.serializeForIpcMessage(error)).toMatchSnapshot();
  });

  it(`${SubprocessRunnerBase.serializeForIpcMessage.name} doesn't handle non-error objects`, () => {
    expect(() => SubprocessRunnerBase.serializeForIpcMessage({})).toThrow();
  });

  it('de-serializes serialized objects', () => {
    function testDeserialization(x: unknown): void {
      expect(
        SubprocessRunnerBase.deserializeFromIpcMessage(SubprocessRunnerBase.serializeForIpcMessage(x))
      ).toEqual(x);
    }

    testDeserialization(1);
    testDeserialization(false);
    testDeserialization('abc');
    // eslint-disable-next-line @rushstack/no-null
    testDeserialization(null);
    testDeserialization(undefined);
    testDeserialization(new Error());
  });
});
