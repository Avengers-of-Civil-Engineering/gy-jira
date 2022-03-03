import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
  projectModalOpen: boolean;
  projectModalEditId: number;
}

const initialState: State = {
  projectModalOpen: false,
  projectModalEditId: 0,
};

export const ProjectListSlice = createSlice({
  name: "ProjectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    editProjectModal(state, action) {
      state.projectModalEditId = action.payload;
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
      state.projectModalEditId = 0;
    },
  },
});

export const projectListActions = ProjectListSlice.actions;

export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen;

export const selectProjectModalEditId = (state: RootState) =>
  state.projectList.projectModalEditId;
