import { createBucketClient } from '@cosmicjs/sdk';
import type { ProjectObject, SkillObject, WorkExperienceObject } from '@/types';

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
});

export async function getProjects(): Promise<ProjectObject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);
    return response.objects as ProjectObject[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch projects');
  }
}

export async function getFeaturedProjects(): Promise<ProjectObject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects', 'metadata.featured': true })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);
    return response.objects as ProjectObject[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch featured projects');
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectObject | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'projects', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type', 'content'])
      .depth(1);
    return response.object as ProjectObject;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch project');
  }
}

export async function getSkills(): Promise<SkillObject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);
    return response.objects as SkillObject[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch skills');
  }
}

export async function getWorkExperience(): Promise<WorkExperienceObject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'work-experience' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at', 'type'])
      .depth(1);
    const experiences = response.objects as WorkExperienceObject[];
    return experiences.sort((a, b) => {
      const dateA = new Date(a.metadata?.start_date || '').getTime();
      const dateB = new Date(b.metadata?.start_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch work experience');
  }
}