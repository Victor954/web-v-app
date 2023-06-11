import { PaginationReqDTO } from 'ts-domain-types/request/common.types';
import { isNumeric } from '../helpers/utils';
import { PipelineStage } from 'mongoose';

export function createPipelines(query: PaginationReqDTO): PipelineStage[] {
	const pipelines: PipelineStage[] = [];

	if(isNumeric(query.offset)) {
		pipelines.push({ $skip: Number.parseInt(query.offset)});
	}

	if(isNumeric(query.limit)) {
		pipelines.push({ $limit: Number.parseInt(query.limit)});
	}

	return pipelines;
}