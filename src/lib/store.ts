import { db } from '@/firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, writeBatch } from 'firebase/firestore';

// --- Types ---
export interface Project {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'image';
    src: string;
    thumbnail?: string;
    featured: boolean;
    category?: string;
    date?: string;
    order?: number;
    isUpcoming?: boolean;
    color?: string;
    createdAt?: string;
    updatedAt?: string;
}

const PROJECTS_COLLECTION = 'projects';

// --- Data Access Functions ---

export async function getProjects(): Promise<Project[]> {
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    // Fetch all projects without orderBy constraint since Firestore excludes
    // documents that don't have the field being ordered by
    const querySnapshot = await getDocs(projectsRef);
    const projects: Project[] = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        projects.push({
            id: doc.id,
            ...data
        } as Project);
    });

    // Sort in memory: projects with order field come first (sorted by order),
    // then projects without order field (sorted by createdAt or date)
    return projects.sort((a, b) => {
        const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
    });
}

export async function addProject(project: Project): Promise<void> {
    // Remove id if it exists, let Firestore generate it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...projectData } = project;

    // Get the current count of projects to set the order for the new one
    const projectsRef = collection(db, PROJECTS_COLLECTION);
    const querySnapshot = await getDocs(projectsRef);
    const newOrder = querySnapshot.size; // New project will be at the end

    await addDoc(collection(db, PROJECTS_COLLECTION), {
        ...projectData,
        order: newOrder,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
}

export async function updateProject(updatedProject: Project): Promise<void> {
    const { id, ...data } = updatedProject;
    const projectRef = doc(db, PROJECTS_COLLECTION, id);

    await updateDoc(projectRef, {
        ...data,
        updatedAt: new Date().toISOString()
    });
}

export async function getProjectById(id: string): Promise<Project | null> {
    const projectRef = doc(db, PROJECTS_COLLECTION, id);
    const projectSnap = await getDoc(projectRef);

    if (projectSnap.exists()) {
        return {
            id: projectSnap.id,
            ...projectSnap.data()
        } as Project;
    } else {
        return null;
    }
}

export async function deleteProject(id: string): Promise<void> {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
}

export async function reorderProjects(newOrder: Project[]): Promise<void> {
    const batch = writeBatch(db);

    newOrder.forEach((project, index) => {
        const projectRef = doc(db, PROJECTS_COLLECTION, project.id);
        batch.update(projectRef, { order: index });
    });

    await batch.commit();
}

// ─── Collaborations ─────────────────────────────────────────────────────

export interface Collaboration {
    id: string;
    title: string;
    client: string;
    description: string;
    type: 'instagram' | 'video' | 'image';
    thumbnail: string;
    external_url: string;
    category?: string;
    order?: number;
    createdAt?: string;
    updatedAt?: string;
}

const COLLABORATIONS_COLLECTION = 'collaborations';

export async function getCollaborations(): Promise<Collaboration[]> {
    const collabRef = collection(db, COLLABORATIONS_COLLECTION);
    const querySnapshot = await getDocs(collabRef);
    const collaborations: Collaboration[] = [];

    querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        collaborations.push({
            id: docSnap.id,
            ...data
        } as Collaboration);
    });

    return collaborations.sort((a, b) => {
        const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
    });
}

export async function addCollaboration(collaboration: Collaboration): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = collaboration;

    const collabRef = collection(db, COLLABORATIONS_COLLECTION);
    const querySnapshot = await getDocs(collabRef);
    const newOrder = querySnapshot.size;

    await addDoc(collection(db, COLLABORATIONS_COLLECTION), {
        ...data,
        order: newOrder,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
}

export async function updateCollaboration(updated: Collaboration): Promise<void> {
    const { id, ...data } = updated;
    const collabRef = doc(db, COLLABORATIONS_COLLECTION, id);

    await updateDoc(collabRef, {
        ...data,
        updatedAt: new Date().toISOString()
    });
}

export async function getCollaborationById(id: string): Promise<Collaboration | null> {
    const collabRef = doc(db, COLLABORATIONS_COLLECTION, id);
    const snap = await getDoc(collabRef);

    if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as Collaboration;
    }
    return null;
}

export async function deleteCollaboration(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLABORATIONS_COLLECTION, id));
}

export async function reorderCollaborations(newOrder: Collaboration[]): Promise<void> {
    const batch = writeBatch(db);

    newOrder.forEach((collab, index) => {
        const collabRef = doc(db, COLLABORATIONS_COLLECTION, collab.id);
        batch.update(collabRef, { order: index });
    });

    await batch.commit();
}

// ─── Acting Projects ────────────────────────────────────────────────────

export interface ActingProject {
    id: string;
    title: string;
    thumbnail: string;
    video_url: string;
    type?: 'reel' | 'youtube';
    category?: string;
    order?: number;
    createdAt?: string;
    updatedAt?: string;
}

const ACTING_COLLECTION = 'actingProjects';

export async function getActingProjects(): Promise<ActingProject[]> {
    const actingRef = collection(db, ACTING_COLLECTION);
    const querySnapshot = await getDocs(actingRef);
    const projects: ActingProject[] = [];

    querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        projects.push({
            id: docSnap.id,
            ...data
        } as ActingProject);
    });

    return projects.sort((a, b) => {
        const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
        const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
    });
}

export async function addActingProject(project: ActingProject): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = project;

    const actingRef = collection(db, ACTING_COLLECTION);
    const querySnapshot = await getDocs(actingRef);
    const newOrder = querySnapshot.size;

    await addDoc(collection(db, ACTING_COLLECTION), {
        ...data,
        order: newOrder,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
}

export async function updateActingProject(updated: ActingProject): Promise<void> {
    const { id, ...data } = updated;
    const actingRef = doc(db, ACTING_COLLECTION, id);

    await updateDoc(actingRef, {
        ...data,
        updatedAt: new Date().toISOString()
    });
}

export async function getActingProjectById(id: string): Promise<ActingProject | null> {
    const actingRef = doc(db, ACTING_COLLECTION, id);
    const snap = await getDoc(actingRef);

    if (snap.exists()) {
        return { id: snap.id, ...snap.data() } as ActingProject;
    }
    return null;
}

export async function deleteActingProject(id: string): Promise<void> {
    await deleteDoc(doc(db, ACTING_COLLECTION, id));
}

export async function reorderActingProjects(newOrder: ActingProject[]): Promise<void> {
    const batch = writeBatch(db);

    newOrder.forEach((project, index) => {
        const actingRef = doc(db, ACTING_COLLECTION, project.id);
        batch.update(actingRef, { order: index });
    });

    await batch.commit();
}

