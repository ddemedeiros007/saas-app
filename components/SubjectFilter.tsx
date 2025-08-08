'use client'
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";
import {Select, SelectTrigger, SelectContent, SelectItem, SelectValue} from "@/components/ui/select";

// A simple array of subjects to populate the dropdown.
const subjects = ["Math", "Language", "Science", "History", "Coding", "Art", "Music", "Economics"];

const SubjectFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('subject') || '';

    const [subject, setSubject] = useState(query);

    useEffect(() => {
        let newUrl = "";

        if (subject === "all") {
            // If "all" is selected, remove the 'subject' key from the URL.
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
        } else {
            // Otherwise, add or update the 'subject' key with the new value.
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "subject",
                value: subject,
            });
        }

        router.push(newUrl, { scroll: false });

    }, [subject, router, searchParams]);

    return (
        <Select onValueChange={setSubject} value={subject}>
            <SelectTrigger className="input capitalize">
                <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {subjects.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                        {s}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SubjectFilter;
