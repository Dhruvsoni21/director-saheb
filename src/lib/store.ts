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

