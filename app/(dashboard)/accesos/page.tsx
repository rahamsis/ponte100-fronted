"use client";

import { ModalStatusDb } from "@/app/components/modales/modalStatusDb";
import { getAccesosByIdPerfil, getAllPerfiles, saveAccesToPerfil } from "@/app/lib/actions";
import { TreeNode, TreeNodeProps, TreeState } from "@/types/tree";
import { Perfil } from "@/types/users";
import { MinusSquare, PlusSquare } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

function Inicio() {
    return (
        <div className="w-full">
            <div className="flex flex-col pt-20">
                <section className="bg-postbanner pt-5">
                    <div className="lg:mx-20">
                        <div className="flex flex-wrap items-start mx-8 lg:mx-3">
                            <div className="">
                                <h2 className="text-xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-left mb-4 lg:mb-8 text-primary">
                                    Accesos
                                </h2>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

// ---- Componente recursivo ----
function TreeNodeRender({ node, state, setState }: TreeNodeProps) {
    const hasChildren = node.children && node.children.length > 0;
    const expanded = !!state.expanded[node.id];
    const checked = !!state.checked[node.id];

    const toggleExpand = () => {
        setState((prev: TreeState) => ({
            ...prev,
            expanded: {
                ...prev.expanded,
                [node.id]: !expanded,
            },
        }));
    };

    const toggleCheck = () => {
        setState((prev: TreeState) => ({
            ...prev,
            checked: {
                ...prev.checked,
                [node.id]: !checked,
            },
        }));
    };

    return (
        <div className="ml-4">
            <div className="flex items-center gap-2 my-3">
                {hasChildren ? (
                    <button type="button" onClick={toggleExpand}>
                        {expanded ? <MinusSquare size={16} /> : <PlusSquare size={16} />}
                    </button>
                ) : (
                    <span className="w-[14px]" />
                )}

                <input type="checkbox" checked={checked} onChange={toggleCheck} />
                <span className="text-base text-gray-900">{node.label}</span>
            </div>

            {hasChildren && expanded && (
                <div className="border-l border-primary ml-2">
                    {node.children.map((child: TreeNode) => (
                        <TreeNodeRender
                            key={child.id}
                            node={child}
                            state={state}
                            setState={setState}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function ModuloAccesos() {
    const [perfiles, setPerfiles] = useState<Perfil[]>([]);
    const [perfilSeleccionado, setPerfilSeleccionado] = useState<string>("");

    const [activeModal, setActiveModal] = useState(false)
    const [statusRegister, setStatusRegister] = useState<boolean | null>(null)
    const [messageRegister, setMessageRegister] = useState<string | null>(null)

    const [accesos, setAccesos] = useState<TreeNode[]>([]);
    const [state, setState] = useState<TreeState>({
        expanded: {},
        checked: {},
    });

    // perfiles
    useEffect(() => {
        getAllPerfiles()
            .then(setPerfiles)
            .catch(console.error);
    }, []);

    const collectChecked = useCallback(
        (nodes: TreeNode[], acc: Record<string, boolean>) => {
        nodes.forEach(n => {
            if (n.checked) acc[String(n.id)] = true;
            if (n.children?.length) collectChecked(n.children, acc);
        });
    }, []);

    // accesos por perfil
    useEffect(() => {
        if (!perfilSeleccionado) return;

        (async () => {
            const data = await getAccesosByIdPerfil(perfilSeleccionado);
            // console.log("esta data: ", data)
            setAccesos(data);

            const initialChecked: Record<string, boolean> = {};
            collectChecked(data, initialChecked);

            setState({
                expanded: {},
                checked: initialChecked,
            });
        })();
    }, [perfilSeleccionado, collectChecked]);

    const handleGuardar = async () => {
        try {
            const result = await saveAccesToPerfil(perfilSeleccionado, state.checked)

            if (!result.ok) {
                setStatusRegister(false)
                setActiveModal(true)
                setMessageRegister(result.message)
                return
            }

            setStatusRegister(true)
            setActiveModal(true)

        } catch (error) {
            setMessageRegister(`Ocurrió un error al guardar el perfil {${error}}`)
        }
    }

    return (
        <div className="w-full">
            <div className="lg:ml-20 mx-8 lg:mx-3 py-4 space-y-4">
                <h1 className="text-button text-lg font-semibold">
                    Administración de Accesos
                </h1>

                <div>
                    <label className="text-sm font-medium">Perfil:</label>
                    <select
                        className="border rounded w-full p-2 mt-1"
                        value={perfilSeleccionado}
                        onChange={(e) => setPerfilSeleccionado(e.target.value)}
                    >
                        <option value="">Seleccione un perfil</option>
                        {perfiles.map((p) => (
                            <option key={p.idPerfil} value={p.idPerfil}>
                                {p.nombrePerfil}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={` rounded p-4 ${perfilSeleccionado && "border"}`}>
                    {accesos.map((node) => (
                        <TreeNodeRender
                            key={node.id}
                            node={node}
                            state={state}
                            setState={setState}
                        />
                    ))}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            handleGuardar()
                        }}
                        className="bg-blue-600 text-white px-4 py-2 rounded">
                        Guardar
                    </button>
                    <button className="bg-teal-600 text-white px-4 py-2 rounded">
                        Actualizar
                    </button>
                </div>

                {/* <pre className="bg-gray-100 p-2 text-xs rounded">
                    {JSON.stringify(state.checked, null, 2)}
                </pre> */}
            </div>

            {activeModal && (
                <ModalStatusDb
                    statusRegister={statusRegister}
                    message={messageRegister}
                    onClose={() => {
                        setActiveModal(false)
                        setMessageRegister(null)
                    }}
                />
            )}
        </div>
    );
}

export default function Accesos() {
    return (
        <div className="flex flex-col min-h-screen pb-20 lg:pb-5">
            <Inicio />

            <ModuloAccesos />

        </div>
    )
}