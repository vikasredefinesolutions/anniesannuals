import { createSlice } from '@reduxjs/toolkit';

export interface _EmployeeState {
  empId: number | null;
  employee: EmployeeType | null;
  loggedIn: boolean;
  isLoadingComplete: boolean;
  isEmpGuest: boolean;
  guestLoginJustByEmail: string;
}

export interface EmployeeType {
  firstname: string;
  lastName: string;
  email: string;
  customerName: string;
  customerEmail: string;
}

const initialState: _EmployeeState = {
  empId: null,
  employee: null,
  loggedIn: false,
  isLoadingComplete: false,
  isEmpGuest: false,
  guestLoginJustByEmail: '',
};

export const employeeSlice = createSlice({
  name: 'employeeDetails',
  initialState,
  reducers: {
    updateEmployee: (
      state,
      action: {
        payload:
          | 'CLEAN_UP'
          | {
              employee: EmployeeType;
              empId: number;
            };
      },
    ) => {
      if (action.payload === 'CLEAN_UP') {
        state.employee = null;
        state.empId = null;
        state.loggedIn = false;
        state.isLoadingComplete = true;
        state.isEmpGuest = false;
        state.guestLoginJustByEmail = '';
        return;
      }

      state.employee = action.payload.employee;
      state.empId = action.payload.empId;
      state.loggedIn = true;
      state.isLoadingComplete = true;
    },
    employee_Login: (
      state,
      action: {
        payload: { isGuest: boolean } | { guestLoginJustByEmail: string };
      },
    ) => {
      if ('isGuest' in action.payload) {
        state.isEmpGuest = action.payload.isGuest;
        return;
      }
      if ('guestLoginJustByEmail' in action.payload) {
        state.guestLoginJustByEmail = action.payload.guestLoginJustByEmail;
        return;
      }
    },
  },
});

export const employeeActions = employeeSlice.actions;
export default employeeSlice.reducer;
