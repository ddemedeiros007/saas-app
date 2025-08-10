import React from 'react'
import { getCompanion } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getSubjectColor } from "@/lib/utils";
import Image from 'next/image';
import CompanionComponent from "@/components/CompanionComponent";

interface CompanionSessionPageProps {
    params: Promise<{ id: string }>;
}

const CompanionSession = async({ params }: CompanionSessionPageProps) => {
    try {
        const resolvedParams = await params;
        const { id } = resolvedParams;

        // This will attempt to fetch the companion and user
        const companion = await getCompanion(id);
        const user = await currentUser();

        if (!user) {
            redirect('/sign-in');
        }
        if (!companion) {
            redirect('/companions');
        }

        const {name, subject, title, topic} = companion;

        return (
            // This main container is now a flex column that takes up the full screen height
            <main className="flex flex-col h-screen">
                <article className="flex rounded-border justify-between p-6 max-md:flex-col">
                    <div className="flex items-center gap-2">
                        <div className="size-[72px] flex items-center justify-center rounded-lg max-mid:hidden"
                             style={{ backgroundColor: getSubjectColor(companion.subject) }}>
                            <Image src={`/icons/${companion.subject}.svg`} alt={companion.subject} width={35} height={35} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-2xl">
                                    {companion.name}
                                </p>
                                <div className="subject-badge max-sm:hidden">
                                    {companion.subject}
                                </div>
                            </div>
                            <p className="text-lg">{companion.topic}</p>
                        </div>
                    </div>
                    {/* The duration is commented out because it was causing unintended layout shifts */}
                    {/* <div className="items-start text-2xl max-md:hidden">
                        {companion.duration} minutes
                    </div> */}
                </article>
                <CompanionComponent
                    // We are now using the `id` as a key to force React to remount the component
                    // and reset its state completely when the companion changes.
                    key={id}
                    {...companion}
                    companionId={id}
                    userName={user.firstName!}
                    userImage={user.imageUrl!}
                />
            </main>
        );
    } catch (error) {
        redirect('/error');
    }
}
export default CompanionSession;
