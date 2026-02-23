/**
 * Tests for authSlice, userSlice and toastSlice.
 * Reducers are called directly – no store setup needed.
 */

import { describe, it, expect } from 'vitest';

import authReducer, {
  finishLoading,
  setAuthenticated,
  setUnauthenticated,
} from '../../../redux/slices/authSlice';

import userReducer, {
  signInUser,
  signOutUser,
} from '../../../redux/slices/userSlice';

import toastReducer, {
  ToastWarningShowed,
} from '../../../redux/slices/toastSlice';

describe('authSlice', () => {
  const initialState = { isAuthenticated: false, isLoading: true };

  it('returns the initial state when called with undefined', () => {
    // Calling reducer with undefined state must return the initialState
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  describe('finishLoading()', () => {
    it('sets isLoading to false', () => {
      const state = authReducer(initialState, finishLoading());
      expect(state.isLoading).toBe(false);
    });

    it('does not change isAuthenticated', () => {
      const state = authReducer(initialState, finishLoading());
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('setAuthenticated()', () => {
    it('sets isAuthenticated to true', () => {
      const state = authReducer(initialState, setAuthenticated());
      expect(state.isAuthenticated).toBe(true);
    });

    it('sets isLoading to false', () => {
      const state = authReducer(initialState, setAuthenticated());
      expect(state.isLoading).toBe(false);
    });
  });

  describe('setUnauthenticated()', () => {
    it('sets isAuthenticated to false', () => {
      const loginState = { isAuthenticated: true, isLoading: false };
      const state = authReducer(loginState, setUnauthenticated());
      expect(state.isAuthenticated).toBe(false);
    });

    it('sets isLoading to false', () => {
      const state = authReducer(initialState, setUnauthenticated());
      expect(state.isLoading).toBe(false);
    });
  });

  describe('state transitions', () => {
    it('goes from loading → authenticated correctly', () => {
      let state = authReducer(undefined, { type: '@@INIT' });
      expect(state.isLoading).toBe(true);
      expect(state.isAuthenticated).toBe(false);

      state = authReducer(state, setAuthenticated());
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
    });

    it('goes from authenticated → unauthenticated on logout', () => {
      const loggedIn = { isAuthenticated: true, isLoading: false };
      const state = authReducer(loggedIn, setUnauthenticated());
      expect(state.isAuthenticated).toBe(false);
    });
  });
});

describe('userSlice', () => {
  const emptyUser = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  const testUser = {
    id: '42',
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max@example.com',
    phoneNumber: '+43123456789',
  };

  it('returns the initial (empty) state on first call', () => {
    expect(userReducer(undefined, { type: '@@INIT' })).toEqual(emptyUser);
  });

  describe('signInUser()', () => {
    it('fills all user fields from the action payload', () => {
      const state = userReducer(undefined, signInUser(testUser));
      expect(state).toEqual(testUser);
    });

    it('overwrites a previous user state', () => {
      const firstState = userReducer(undefined, signInUser(testUser));
      const newUser = { ...testUser, id: '99', firstName: 'Anna' };
      const state = userReducer(firstState, signInUser(newUser));
      expect(state.firstName).toBe('Anna');
      expect(state.id).toBe('99');
    });
  });

  describe('signOutUser()', () => {
    it('resets all fields to empty strings', () => {
      const loggedIn = userReducer(undefined, signInUser(testUser));
      const state = userReducer(loggedIn, signOutUser());
      expect(state).toEqual(emptyUser);
    });

    it('is idempotent – calling it on an empty state keeps it empty', () => {
      const state = userReducer(emptyUser, signOutUser());
      expect(state).toEqual(emptyUser);
    });
  });
});

describe('toastSlice', () => {
  const initialState = { showWarning: true };

  it('returns the initial state with showWarning: true', () => {
    expect(toastReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  describe('ToastWarningShowed()', () => {
    it('sets showWarning to false', () => {
      const state = toastReducer(initialState, ToastWarningShowed());
      expect(state.showWarning).toBe(false);
    });

    it('is idempotent – calling it twice stays false', () => {
      let state = toastReducer(initialState, ToastWarningShowed());
      state = toastReducer(state, ToastWarningShowed());
      expect(state.showWarning).toBe(false);
    });
  });
});
