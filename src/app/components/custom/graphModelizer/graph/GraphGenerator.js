import COLORS from "../../../../constants/Colors";

class GraphGenerator {
    constructor(selectedSubsystems) {
        this.selectedSubsystems = selectedSubsystems;
        this.groups = this.generateGroups();
    }

    get nodes() {
        let nodes = [];
        for (let i = 0; i < this.selectedSubsystems.length; i++) {
            for (let j = 0; j < this.selectedSubsystems[i].selectedComponents.length; j++) {
                const node = this.selectedSubsystems[i].selectedComponents[j];
                nodes.push({
                    id: node.id,
                    group: node.subsystemId,
                    label: node.name,
                    title: `Key: ${node.key}, Type: ${node.type}`,
                });
            }
        }
        return nodes;
    }

    get edges() {
        let relationships = [];
        for (let i = 0; i < this.selectedSubsystems.length; i++) {
            for (let j = 0; j < this.selectedSubsystems[i].selectedComponents.length; j++) {
                for (let k = 0; k < this.selectedSubsystems[i].selectedComponents[j].relationships.length; k++) {
                    const source = this.selectedSubsystems[i].selectedComponents[j]
                    const target = this.selectedSubsystems[i].selectedComponents[j].relationships[k];
                    if (target === undefined) {
                        break
                    }
                    relationships.push({
                        from: source.id,
                        to: target.id,
                        width: target.interaction.intensity === "Strong" ? 5 : target.interaction.intensity === "Medium" ? 3 : 1,
                        dashes: target.interaction.key === "True" || target.interaction.key === "true",
                        label: target.interaction.intensity,
                        title: `State: ${target.interaction.state}, Key: ${target.interaction.key}`,
                        color: {
                            hover: this.groups[source.subsystemId].color.border,
                            color: this.groups[source.subsystemId].color.background,
                            highlight: this.groups[source.subsystemId].color.border
                        },
                    });
                }
            }
        }
        return relationships;
    }

    get graph() {
        return {
            nodes: this.nodes,
            edges: this.edges,
        }
    }

    get options() {
        return {
            autoResize: true,

            groups: this.groups,

            layout: {
                hierarchical: false
            },

            edges: {
                arrows: {
                    to: false,
                },
                smooth: {
                    "type": "dynamic",
                    "forceDirection": "none",
                    "roundness": 0.2
                },
            },

            nodes: {
                shape: "dot",
                size: 20,
                borderWidth: 2,
                font: {
                    size: 16,
                    color: "#343434",
                    strokeWidth: 2,
                    strokeColor: "#ffffff",
                },
            },

            interaction: {
                hover: true,
                hideEdgesOnDrag: true,
            }
        };
    }

    generateGroups() {
        let groups = {};
        let i = 0;
        const size = this.selectedSubsystems.length
        for (let color in COLORS) {
            if (i < size) {
                groups[this.selectedSubsystems[i].id] = {
                    color: {
                        border: COLORS[color].outer,
                        background: COLORS[color].inner,
                        hover: {
                            border: COLORS[color].outer,
                            background: COLORS[color].hover,
                        },
                        highlight: {
                            border: COLORS[color].outer,
                            background: COLORS[color].hover,
                        }
                    },
                }
            }
            i++;
        }
        return groups;
    }
}

export default GraphGenerator;

