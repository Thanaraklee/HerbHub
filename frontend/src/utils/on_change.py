import streamlit as st

def on_change_selectbox():
    st.session_state.selections = []
    st.session_state.xyz = {}
    st.session_state.summarize_success = False
    st.session_state.summarize_content = ""