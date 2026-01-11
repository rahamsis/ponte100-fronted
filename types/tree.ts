export interface TreeNode {
    id: string;
    type: 'menu' | 'submenu' | 'permiso';
    label: string;
    children: TreeNode[];
    checked?: boolean;
}

export interface TreeState {
    expanded: Record<string, boolean>;
    checked: Record<string, boolean>;
}

export interface TreeNodeProps {
    node: TreeNode;
    state: TreeState;
    setState: React.Dispatch<React.SetStateAction<TreeState>>;
}