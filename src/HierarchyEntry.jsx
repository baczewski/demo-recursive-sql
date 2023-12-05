const HierarchyEntry = ({ 
    roots 
}) => {
    return (
       <div>
            { roots && roots.map((root) => (
                <div style={{ marginLeft: '20px' }}>
                    <div key={root.id}>
                        {root.name}
                    </div>

                    <HierarchyEntry roots={root.children} />
                </div>
            )) }
       </div>
    );
}

export default HierarchyEntry;