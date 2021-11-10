import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";
import { useState } from "react";

const UpwardArrow = styled.div`
	width: 0;
	height: 0;
	border-left: 20px solid transparent;
	border-right: 20px solid transparent;
	border-bottom: 20px solid
		${(props) => (props.uservote === 1 ? "#f48024;" : "lightgrey")};
	padding: 0;
`;

const DownwardArrow = styled.div`
	width: 0;
	height: 0;
	border-left: 20px solid transparent;
	border-right: 20px solid transparent;
	border-top: 20px solid
		${(props) => (props.uservote === -1 ? "#f48024;" : "lightgrey")};
	padding: 0;
`;

const ArrowButton = styled.button`
	border: 0;
	background: none;
	font-size: 2rem;
	display: flex;
	flexdirection: "column" as "column";
	cursor: pointer;
	text-align: center;
	pointer-events: ${(props) => (props.disabled ? "none" : "pointer")};
`;

const VoteTotal = styled.div`
	text-align: center;
	width: 52px;
	padding: 7px 0 5px;
	font-size: 1.4rem;
	color: black;
	line-height: 1.4rem;
`;

function VotingArrows(props) {
	console.log("userVote", props.userVote);
	return (
		<div {...props}>
			<ArrowButton onClick={() => props.onUpvote()} disabled = {props.disabled} >
				{" "}
				<UpwardArrow uservote={props.userVote} />{" "}
			</ArrowButton>
			<VoteTotal> {props.total} </VoteTotal>
			<ArrowButton onClick={() => props.onDownvote()} disabled = {props.disabled}>
				{" "}
				<DownwardArrow uservote={props.userVote}  />{" "}
			</ArrowButton>
		</div>
	);
}

VotingArrows.propTypes = {
	total: PropTypes.number.isRequired,
	userVote: PropTypes.number.isRequired,
	onUpvote: PropTypes.any,
	onDownvote: PropTypes.any,
	disabled: PropTypes.bool
};

export default VotingArrows;