import HierarchyEntry from "./HierarchyEntry";

const developersHierarchy = [
    { id: 1, name: 'CEO', status: 'manager', managerID: null },
        { id: 2, name: 'Manager1', status: 'manager', managerID: 1 },
    { id: 3, name: 'Developer1', status: 'employee', managerID: 2 },
    { id: 4, name: 'Developer2', status: 'employee', managerID: 2 },
        { id: 5, name: 'Manager2', status: 'manager', managerID: 1 },
            { id: 6, name: 'Developer3', status: 'employee', managerID: 5 },

    { id: 7, name: 'CEO 2', status: 'manager', managerID: null }
];

const factor = (number) => {
    if (number <= 1) return 1;

    return number * factor(number - 1);
}

const TreeBuilder = (hierarchy, root) => {
    const rootNode = { ...root };

    const children = hierarchy
        .filter((node) => node.managerID === root.id)
        .map((node) => TreeBuilder(hierarchy, node));

    if (children.length > 0) {
        rootNode.children = children;
    }

    return rootNode;
}

const Hierarchy = () => {
    const treeRoots =  developersHierarchy
        .filter((node) => node.managerID === null)
        .map((node) => TreeBuilder(developersHierarchy, node));

    console.log(factor(4));

    return (
        <HierarchyEntry roots={treeRoots} />
    );
}

export default Hierarchy;