import streamlit as st

def on_change_selectbox():
    st.session_state.selections = []
    st.session_state.xyz = {}